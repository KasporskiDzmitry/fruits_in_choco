package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductRatingRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.product.ProductResponse;
import by.dz.fruits_in_choco.fruits_in_choco.dto.product.ProductSearchRequest;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.exception.EntityNotFoundException;
import by.dz.fruits_in_choco.fruits_in_choco.exception.ProductDeletedException;
import by.dz.fruits_in_choco.fruits_in_choco.mapper.ProductMapper;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.ProductServiceImpl;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static by.dz.fruits_in_choco.fruits_in_choco.util.Constants.*;

@RestController
@RequestMapping("/api/v1")
public class ProductController {
    private final ProductServiceImpl productService;
    private final ProductMapper mapper;
    private final static Logger log = LogManager.getLogger(ProductController.class);

    public ProductController(ProductServiceImpl productService, ProductMapper mapper) {
        this.productService = productService;
        this.mapper = mapper;
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductResponse>> getProducts(
            @RequestParam(required = false, defaultValue = DEFAULT_PAGE) int page,
            @RequestParam(required = false, defaultValue = DEFAULT_PAGE_SIZE) int size,
            @RequestParam(required = false, defaultValue = DEFAULT_SORT_BY_FIELD) String sortBy,
            @RequestParam(required = false, defaultValue = DEFAULT_SORT_DIRECTION) String direction) {
        return ResponseEntity.ok(mapper.getProducts(page, size, direction, sortBy));
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(mapper.getProductById(id));
        } catch (EntityNotFoundException | ProductDeletedException e) {
            log.error("Failed to get product with id " + id, e);
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PostMapping("/products/search")
    public ResponseEntity<List<ProductResponse>> getProductsFilteredByCategories(@RequestBody ProductSearchRequest request) {
        return ResponseEntity.ok(mapper.getProductsFilteredByCategories(request.getCategories()));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/admin/products")
    public ResponseEntity<ProductResponse> saveProduct(@RequestBody Product product) {
        return ResponseEntity.ok(mapper.saveProduct(product));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/admin/products/{id}")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product, @PathVariable Long id) {
        return ResponseEntity.ok(productService.updateProduct(product, id));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/admin/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProductById(id);
            return ResponseEntity.ok(200);
        } catch (EntityNotFoundException e) {
            log.error("Failed to delete product with id " + id, e);
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/products/{id}/ratings")
    public ResponseEntity<?> rateProduct(@RequestBody ProductRatingRequest request, @PathVariable Long id) {
        try {
            return ResponseEntity.ok(mapper.rateProduct(request, id));
        } catch (EntityNotFoundException e) {
            log.error("Failed to rate product with id " + id);
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/admin/products/{productId}/ratings/{ratingId}")
    public ResponseEntity<?> approveRating(@RequestBody ProductRatingRequest rating, @PathVariable Long productId, @PathVariable Long ratingId) {
        try {
            return ResponseEntity.ok(productService.approveReview(rating, productId, ratingId));
        } catch (EntityNotFoundException e) {
            log.error("Failed to approve rating with id " + ratingId, e);
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/admin/products/{productId}/ratings/{ratingId}")
    public ResponseEntity<?> deleteRating(@PathVariable Long productId, @PathVariable Long ratingId) {
        try {
            productService.deleteProductRatingById(productId, ratingId);
            return ResponseEntity.ok(200);
        } catch (EntityNotFoundException e) {
            log.error("Failed to delete product rating with id " + ratingId, e);
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
