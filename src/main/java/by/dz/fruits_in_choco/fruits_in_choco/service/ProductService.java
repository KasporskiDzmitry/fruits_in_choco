package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductRatingRequest;
import by.dz.fruits_in_choco.fruits_in_choco.entity.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.ProductRating;
import by.dz.fruits_in_choco.fruits_in_choco.entity.ProductRatingKey;

import java.util.List;

public interface ProductService {

    List<Product> getProducts(int page, int size, String direction, String sortBy);

    Product getProductById(Long id);

    List<Product> getProductsFilteredByTypes(List<Long> types);

    Product saveProduct(Product product);

    Product updateProduct(Product product, Long id);

    void deleteProductById(Long id);

    Product rateProduct(ProductRatingRequest request, Long id);

    void updateRating(ProductRating rating);

    void deleteRating(Long id);

}
