package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductRatingRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductRequest;
import by.dz.fruits_in_choco.fruits_in_choco.entity.Product;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.ProductServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import static by.dz.fruits_in_choco.fruits_in_choco.util.Constants.*;

@RestController
public class ProductController {
    private final ProductServiceImpl productService;

    public ProductController(ProductServiceImpl productService) {
        this.productService = productService;
    }

    @GetMapping("/product")
    public ResponseEntity<?> getProducts(
            @RequestParam(required = false, defaultValue = DEFAULT_PAGE) int page,
            @RequestParam(required = false, defaultValue = DEFAULT_PAGE_SIZE) int size,
            @RequestParam(required = false, defaultValue = DEFAULT_SORT_BY_FIELD) String sortBy,
            @RequestParam(required = false, defaultValue = DEFAULT_SORT_DIRECTION) String direction) {
        return ResponseEntity.ok(productService.getProducts(page, size, direction, sortBy));
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PostMapping("/product/search")
    public ResponseEntity<?> getProductsFilteredByTypes(@RequestBody ProductRequest request) {
        return ResponseEntity.ok(productService.getProductsFilteredByTypes(request.getTypes()));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/admin/product")
    public ResponseEntity<?> saveProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.saveProduct(product));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/admin/product/{id}")
    public ResponseEntity<?> updateProduct(@RequestBody Product product, @PathVariable Long id) {
        return ResponseEntity.ok(productService.updateProduct(product, id));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/admin/product/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        productService.deleteProductById(id);
        return ResponseEntity.ok(200);
    }

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/product/{id}/rateProduct")
    public ResponseEntity<?> rateProduct(@RequestBody ProductRatingRequest request, @PathVariable Long id) {
        return ResponseEntity.ok(productService.rateProduct(request, id));
    }

//    @PreAuthorize("hasAuthority('USER')")
//    @PutMapping("/product/{id}/rating")
//    public ResponseEntity<?> updateRating(@RequestBody ProductRating rating, @PathVariable Long id) {
//        productService.updateRating(rating);
//        return ResponseEntity.noContent().build();
//    }

    @PreAuthorize("hasAuthority('USER')")
    @DeleteMapping("/product/{idProduct}/rating/{idRating}")
    public ResponseEntity<?> deleteRating(@PathVariable Long idProduct, @PathVariable Long idRating) {
//        ProductRatingKey id = new ProductRatingKey();
//        id.setProduct_id(idProduct);
//        id.setUser_id(idUser);
        productService.deleteRating(idRating);
        return ResponseEntity.noContent().build();
    }
}
