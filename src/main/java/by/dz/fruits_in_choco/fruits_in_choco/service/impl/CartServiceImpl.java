package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.entity.cart.Cart;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cart.CartItem;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.repository.UserRepository;
import by.dz.fruits_in_choco.fruits_in_choco.service.CartService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service("cartService")
@Transactional
public class CartServiceImpl implements CartService {
    private final UserRepository userRepository;

    public CartServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public CartItem updateCart(String email, Product product, int quantity) {
        Cart cart = userRepository.findByEmail(email).get().getCart();
        return cart.update(product, quantity);
    }

    @Override
    public Product addToCart(Product product, int quantity, String email) {
        Cart cart = userRepository.findByEmail(email).get().getCart();
        cart.add(new CartItem(quantity, product));
//        cart.refresh();
        return product;
    }

    @Override
    public void deleteFromCart(Long id, String email) {
        Cart cart = userRepository.findByEmail(email).get().getCart();
        cart.delete(id);
    }
}
