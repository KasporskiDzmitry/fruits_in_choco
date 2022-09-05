package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.dto.product.ProductRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.user.UserRequest;
import by.dz.fruits_in_choco.fruits_in_choco.mapper.UserMapper;
import by.dz.fruits_in_choco.fruits_in_choco.service.ProfileService;
import by.dz.fruits_in_choco.fruits_in_choco.service.UserService;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.ProfileServiceImpl;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.UserServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class ProfileController {
    private final UserService userService;
    private final ProfileService profileService;
    private final UserMapper userMapper;

    ProfileController(UserServiceImpl userService, ProfileServiceImpl profileService, UserMapper userMapper) {
        this.profileService = profileService;
        this.userMapper = userMapper;
        this.userService = userService;
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
        return ResponseEntity.ok(userMapper.addToCart(product, authentication.getName()));
    }

    @PreAuthorize("hasAuthority('USER')")
    @DeleteMapping("/profile/cart/{id}")
    public ResponseEntity<?> deleteFromCart(@PathVariable Short id, Authentication authentication) {
        profileService.deleteFromCart(id, authentication.getName());
        return ResponseEntity.ok(200);
    }
}
