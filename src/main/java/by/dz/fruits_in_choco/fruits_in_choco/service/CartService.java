package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.entity.cart.CartItem;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;

public interface CartService {
    CartItem updateCart(String email, Product product, short quantity);
    Product addToCart(Product product, int quantity, String email);
    void deleteFromCart(short id, String email);
}
