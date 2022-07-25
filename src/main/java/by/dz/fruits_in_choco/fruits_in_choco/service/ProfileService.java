package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;

public interface ProfileService {
    User updateProfile(User newProfile);
    Product addToCart(Product product, int quantity, String email);
    void deleteFromCart(Long id, String email);
}
