package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.dto.product.ProductRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.user.UserRequest;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.mapper.UserMapper;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.UserServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import static by.dz.fruits_in_choco.fruits_in_choco.util.Constants.*;
import static by.dz.fruits_in_choco.fruits_in_choco.util.Constants.DEFAULT_SORT_DIRECTION;

@RestController
public class UserController {
    UserServiceImpl userService;
    UserMapper userMapper;

    UserController(UserServiceImpl userService, UserMapper userMapper) {
        this.userMapper = userMapper;
        this.userService = userService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/users")
    public ResponseEntity<?> getUsers(
            @RequestParam(required = false, defaultValue = DEFAULT_PAGE) int page,
            @RequestParam(required = false, defaultValue = DEFAULT_PAGE_SIZE) int size,
            @RequestParam(required = false, defaultValue = DEFAULT_SORT_BY_FIELD) String sortBy,
            @RequestParam(required = false, defaultValue = DEFAULT_SORT_DIRECTION) String direction) {
        return ResponseEntity.ok(userService.getUsers(page, size, direction, sortBy));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/users/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
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
    public ResponseEntity<?> deleteFromCart(@PathVariable Long id, Authentication authentication) {
        userService.deleteFromCart(id, authentication.getName());
        return ResponseEntity.ok(200);
    }

}
