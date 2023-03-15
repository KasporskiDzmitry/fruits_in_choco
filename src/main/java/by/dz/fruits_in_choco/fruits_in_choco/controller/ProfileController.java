package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.dto.product.ProductRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.user.UserRequest;
import by.dz.fruits_in_choco.fruits_in_choco.exception.EntityNotFoundException;
import by.dz.fruits_in_choco.fruits_in_choco.mapper.ProductMapper;
import by.dz.fruits_in_choco.fruits_in_choco.mapper.UserMapper;
import by.dz.fruits_in_choco.fruits_in_choco.service.CartService;
import by.dz.fruits_in_choco.fruits_in_choco.service.ProfileService;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.CartServiceImpl;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.ProfileServiceImpl;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class ProfileController {
    private final ProfileService profileService;
    private final UserMapper userMapper;
    private final ProductMapper productMapper;
    private final CartService cartService;
    private final static Logger log = LogManager.getLogger(ProductController.class);

    ProfileController(ProfileServiceImpl profileService, UserMapper userMapper, ProductMapper productMapper, CartServiceImpl cartService) {
        this.profileService = profileService;
        this.userMapper = userMapper;
        this.productMapper = productMapper;
        this.cartService = cartService;
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        return ResponseEntity.ok(userMapper.getProfile(authentication.getName()));
    }

    @PreAuthorize("hasAuthority('USER')")
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody UserRequest newProfile) {
        return ResponseEntity.ok(userMapper.updateProfile(newProfile));
    }

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/profile/cart")
    public ResponseEntity<?> addToCart(@RequestBody ProductRequest product, Authentication authentication) {
        return ResponseEntity.ok(cartService.addToCart(productMapper.mapToEntity(product), product.getQuantity(), authentication.getName()));
    }

    @PreAuthorize("hasAuthority('USER')")
    @PutMapping("/profile/cart")
    public ResponseEntity<?> updateCart(@RequestBody ProductRequest request, Authentication authentication) {
        return ResponseEntity.ok(cartService.updateCart(authentication.getName(), productMapper.mapToEntity(request), request.getQuantity()));
    }

    @PreAuthorize("hasAuthority('USER')")
    @DeleteMapping("/profile/cart/{id}")
    public ResponseEntity<?> deleteFromCart(@PathVariable Short id, Authentication authentication) {
        try {
            cartService.deleteFromCart(id, authentication.getName());
            return ResponseEntity.ok(200);
        } catch (EntityNotFoundException e) {
            log.error("Failed to delete product with id " + id + " from cart");
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
