package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductReviewRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.product.ProductRequest;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.mapper.UserMapper;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.ProductServiceImpl;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.UserServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class ProductController {

    private ProductServiceImpl productService;
    private UserMapper userMapper;

    public ProductController(ProductServiceImpl productService, UserMapper mapper) {
        this.productService = productService;
        this.userMapper = mapper;
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

    @PostMapping("/product/review")
    public ResponseEntity<?> saveReview(@RequestBody ProductReviewRequest request) {
        Product product = userMapper.addReviewToProduct(request, request.getProductId());
        return ResponseEntity.ok(product);
    }
}
