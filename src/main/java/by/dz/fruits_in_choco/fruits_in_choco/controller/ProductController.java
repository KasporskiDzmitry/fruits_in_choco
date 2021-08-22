package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductReviewRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.product.ProductRequest;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.productReview.ProductReview;
import by.dz.fruits_in_choco.fruits_in_choco.mapper.UserMapper;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.ProductServiceImpl;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.UserServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class ProductController {

    private ProductServiceImpl productService;
    private UserServiceImpl userService;
    private UserMapper userMapper;

    public ProductController(ProductServiceImpl productService, UserMapper mapper, UserServiceImpl userService) {
        this.productService = productService;
        this.userMapper = mapper;
        this.userService = userService;
    }

    @GetMapping("/product")
    public ResponseEntity<?> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<?> getProductById(@PathVariable int id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PostMapping("/product/search")
    public ResponseEntity<?> getProductsFilteredByTypes(@RequestBody ProductRequest request) {
        return ResponseEntity.ok(productService.getProductsFilteredByTypes(request.getTypes()));
    }

    @GetMapping("/categories")
    public ResponseEntity<?> getAllCategories() {
        return ResponseEntity.ok(productService.getAllCategories());
    }


    // вынести в userController ???

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
