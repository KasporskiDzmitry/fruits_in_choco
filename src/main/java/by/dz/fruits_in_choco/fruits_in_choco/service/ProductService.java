package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductRatingRequest;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;

import java.util.List;

public interface ProductService {

    List<Product> getProducts(int page, int size, String direction, String sortBy);

    Product getProductById(Long id);

    List<Product> getProductsFilteredByCategories(List<Long> categories);

    Product saveProduct(Product product);

    Product updateProduct(Product product, Long id);

    void deleteProductById(Long id);

    Product rateProduct(ProductRatingRequest request, Long id);

    Product approveReview(ProductRatingRequest rating, Long productId, Long ratingId);

    void deleteProductRatingById(Long productId, Long ratingId);
}
