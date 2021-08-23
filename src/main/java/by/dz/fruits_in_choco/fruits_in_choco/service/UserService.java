package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.productReview.ProductReview;

public interface UserService {
    Product saveProductReview(ProductReview review);

    void updateReview(ProductReview review);

    void deleteReview(int id);
}
