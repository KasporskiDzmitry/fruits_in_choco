package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductRatingRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.product.ProductSearchRequest;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.exception.ProductDeletedException;
import by.dz.fruits_in_choco.fruits_in_choco.mapper.ProductMapper;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.ProductServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

import static by.dz.fruits_in_choco.fruits_in_choco.util.Constants.*;

@RestController
@RequestMapping("/api/v1")
public class ProductController {
    private final ProductServiceImpl productService;
    private final ProductMapper mapper;

    public ProductController(ProductServiceImpl productService, ProductMapper mapper) {
        this.productService = productService;
        this.mapper = mapper;
    }

    @GetMapping("/products")
    public ResponseEntity<?> getProducts(
            @RequestParam(required = false, defaultValue = DEFAULT_PAGE) int page,
            @RequestParam(required = false, defaultValue = DEFAULT_PAGE_SIZE) int size,
            @RequestParam(required = false, defaultValue = DEFAULT_SORT_BY_FIELD) String sortBy,
            @RequestParam(required = false, defaultValue = DEFAULT_SORT_DIRECTION) String direction) {
        System.out.println("HELLO");
        return ResponseEntity.ok(mapper.getProducts(page, size, direction, sortBy));
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(mapper.getProductById(id));
        } catch (NoSuchElementException | ProductDeletedException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PostMapping("/products/search")
    public ResponseEntity<?> getProductsFilteredByCategories(@RequestBody ProductSearchRequest request) {
        return ResponseEntity.ok(mapper.getProductsFilteredByCategories(request.getCategories()));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/admin/products")
    public ResponseEntity<?> saveProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.saveProduct(product));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/admin/products/{id}")
    public ResponseEntity<?> updateProduct(@RequestBody Product product, @PathVariable Long id) {
        return ResponseEntity.ok(productService.updateProduct(product, id));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/admin/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        productService.deleteProductById(id);
        return ResponseEntity.ok(200);
    }

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/products/{id}/ratings")
    public ResponseEntity<?> rateProduct(@RequestBody ProductRatingRequest request, @PathVariable Long id) {
        return ResponseEntity.ok(mapper.rateProduct(request, id));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/admin/products/{productId}/ratings/{ratingId}")
    public ResponseEntity<?> approveRating(@RequestBody ProductRatingRequest rating, @PathVariable Long productId, @PathVariable Long ratingId) {
        return ResponseEntity.ok(productService.approveReview(rating, productId, ratingId));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/admin/products/{productId}/ratings/{ratingId}")
    public ResponseEntity<?> deleteRating(@PathVariable Long productId, @PathVariable Long ratingId) {
        productService.deleteProductRatingById(productId, ratingId);
        return ResponseEntity.ok(200);
    }
}
