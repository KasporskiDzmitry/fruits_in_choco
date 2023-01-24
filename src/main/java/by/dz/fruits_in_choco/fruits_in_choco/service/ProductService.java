package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductRatingRequest;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;

import java.util.List;

public interface ProductService {
    List<Product> getProducts(int page, int size, String direction, String sortBy);
    Product getProductById(short id);
    List<Product> getProductsFilteredByCategories(List<Short> categories);
    Product saveProduct(Product product);
    Product updateProduct(Product product, short id);
    void deleteProductById(short id);
    Product rateProduct(ProductRatingRequest request, short id);
    Product approveReview(ProductRatingRequest rating, short productId, short ratingId);
    void deleteProductRatingById(short productId, short ratingId);
}
