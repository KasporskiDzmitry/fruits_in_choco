package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductRatingRequest;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;

import java.util.List;

public interface ProductService {
    List<Product> getProducts(int page, int size, String direction, String sortBy);
    Product getProductById(Short id);
    List<Product> getProductsFilteredByCategories(List<Short> categories);
    Product saveProduct(Product product);
    Product updateProduct(Product product, Short id);
    void deleteProductById(Short id);
    Product rateProduct(ProductRatingRequest request, Short id);
    Product approveReview(ProductRatingRequest rating, Short productId, Short ratingId);
    void deleteProductRatingById(Short productId, Short ratingId);
}
