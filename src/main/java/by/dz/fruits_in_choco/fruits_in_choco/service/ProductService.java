package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Category;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.productReview.ProductReview;

import java.util.List;

public interface ProductService {

    List<Product> getAllProducts();

    Product getProductById(int id);

    List<Product> getProductsFilteredByTypes(List<Integer> types);

    List<Category> getAllCategories();

    List<ProductReview> getReviewsByProductId(int id);
}
