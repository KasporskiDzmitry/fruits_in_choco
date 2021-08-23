package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductReviewRequest;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.productReview.ProductReview;
import by.dz.fruits_in_choco.fruits_in_choco.mapper.UserMapper;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.UserServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    UserServiceImpl userService;
    private UserMapper userMapper;

    UserController(UserServiceImpl userService, UserMapper userMapper) {
        this.userMapper = userMapper;
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        return ResponseEntity.ok(userService.getUser(authentication.getName()));
    }

    @PostMapping("/product/review")
    public ResponseEntity<?> saveReview(@RequestBody ProductReviewRequest request) {
        Product product = userMapper.addReviewToProduct(request, request.getProductId(), request.getReviewerId());
        return ResponseEntity.ok(product);
    }

    @PutMapping("/product/review")
    public ResponseEntity<?> updateReview(@RequestBody ProductReview review) {
        userService.updateReview(review);
        return ResponseEntity.ok(200);
    }
}
