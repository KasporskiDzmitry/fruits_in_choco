package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.entity.cart.Cart;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cart.CartItem;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;
import by.dz.fruits_in_choco.fruits_in_choco.repository.*;
import by.dz.fruits_in_choco.fruits_in_choco.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service("userService")
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ProductRatingRepository productRatingRepository;
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;

    public UserServiceImpl(UserRepository userRepository, ProductRatingRepository productRatingRepository, ProductRepository productRepository, CartItemRepository cartItemRepository, CartRepository cartRepository) {
        this.productRatingRepository = productRatingRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.cartItemRepository = cartItemRepository;
        this.cartRepository = cartRepository;
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> getUsers(int page, int size, String direction, String sortBy) {
        Page<User> userPage =  userRepository.findAll(PageRequest.of(page ,size, Sort.Direction.fromString(direction), sortBy));
        return userPage.getContent();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).get();
    }

    @Override
    public User updateProfile(User newProfile) {
        return userRepository.findById(newProfile.getId())
                .map(user -> {
                    user.setFirstName(newProfile.getFirstName());
                    user.setLastName(newProfile.getLastName());
                    user.setEmail(newProfile.getEmail());
                    user.setRatings(newProfile.getRatings());
                    return userRepository.save(user);
                })
                .orElseGet(() -> {
                    newProfile.setId(newProfile.getId());
                    return userRepository.save(newProfile);
                });
    }

    @Override
    public Product addToCart(Product product, int quantity, String email) {
        User user = userRepository.findByEmail(email);
        Cart cart = user.getCart();

        cart.setPrice(cart.getPrice() + product.getPrice());
        cart.setQuantity(cart.getQuantity() + quantity);

        CartItem item = new CartItem();
        item.setQuantity(quantity);
        item.setProduct(product);
        cartItemRepository.save(item);
        cart.getCartItems().add(item);
        cartRepository.save(cart);

        return product;
    }

    @Override
    public void deleteFromCart(Long id, String email) {
        User user = userRepository.findByEmail(email);
        Cart cart = user.getCart();
        CartItem cartItem = cartItemRepository.findById(cart.getCartItems().stream().filter(i -> i.getProduct().getId().equals(id)).collect(Collectors.toList()).get(0).getId()).get();

        cart.getCartItems().remove(cartItem);

        cartItemRepository.delete(cartItem);

        cart.setPrice(cart.getCartItems().stream().map(i -> i.getProduct().getPrice()).mapToDouble(Integer::intValue).sum());
        cart.setQuantity(cart.getCartItems().stream().map(CartItem::getQuantity).mapToInt(Integer::intValue).sum());

        cartRepository.save(cart);
    }

}
