package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.entity.cart.Cart;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cart.CartItem;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;
import by.dz.fruits_in_choco.fruits_in_choco.exception.EntityNotFoundException;
import by.dz.fruits_in_choco.fruits_in_choco.repository.*;
import by.dz.fruits_in_choco.fruits_in_choco.service.ProfileService;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service("profileService")
public class ProfileServiceImpl implements ProfileService {
    private final UserRepository userRepository;
    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;

    public ProfileServiceImpl(UserRepository userRepository, CartItemRepository cartItemRepository, CartRepository cartRepository) {
        this.userRepository = userRepository;
        this.cartItemRepository = cartItemRepository;
        this.cartRepository = cartRepository;
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
        cart.setQuantity((short) (cart.getQuantity() + quantity));

        CartItem item = new CartItem();
        item.setQuantity((short) quantity);
        item.setProduct(product);
        cartItemRepository.save(item);
        cart.getCartItems().add(item);
        cartRepository.save(cart);

        return product;
    }

    @Override
    public void deleteFromCart(short id, String email) {
        User user = userRepository.findByEmail(email);
        Cart cart = user.getCart();
        Short cartItemId = cart.getCartItems().stream().filter(i -> i.getProduct().getId() == id).collect(Collectors.toList()).get(0).getId();
        CartItem cartItem = cartItemRepository.findById(cartItemId).orElse(null);

        if (null == cartItem) {
            throw new EntityNotFoundException(CartItem.class.getSimpleName(), cartItemId);
        }

        cart.getCartItems().remove(cartItem);

        cartItemRepository.delete(cartItem);

        cart.setPrice((float) cart.getCartItems().stream().map(i -> i.getProduct().getPrice()).mapToDouble(Float::floatValue).sum());
        cart.setQuantity((short) cart.getCartItems().stream().map(CartItem::getQuantity).mapToInt(Short::shortValue).sum());

        cartRepository.save(cart);
    }
}
