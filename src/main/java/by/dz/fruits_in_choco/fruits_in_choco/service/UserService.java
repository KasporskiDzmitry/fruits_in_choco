package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.dto.product.ProductRequest;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;

import java.util.List;

public interface UserService {
    List<User> getUsers(int page, int size, String direction, String sortBy);
    User getUserById(Long id);
    User getUserByEmail(String email);
    User updateProfile(User newProfile);

    Product addToCart(Product product, String email);
    void deleteFromCart(Long id, String email);
}
