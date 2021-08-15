package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.dto.product.ProductRequest;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.ProductServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {

    private ProductServiceImpl productService;

    public ProductController(ProductServiceImpl productService) {
        this.productService = productService;
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

//    @GetMapping("/reviews")
//    public ResponseEntity<?> getReviewsByProductId(@PathVariable int id) {
//        return ResponseEntity.ok(productService.getReviewsByProductId(id));
//    }
}
