package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.entity.cart.Cart;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cart.CartItem;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;
import by.dz.fruits_in_choco.fruits_in_choco.exception.EntityNotFoundException;
import by.dz.fruits_in_choco.fruits_in_choco.repository.CartItemRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.CartRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.UserRepository;
import by.dz.fruits_in_choco.fruits_in_choco.service.CartService;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service("cartService")
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;

    public CartServiceImpl(CartRepository cartRepository, CartItemRepository cartItemRepository, UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
    }

    @Override
    public CartItem updateCart(String email, Product product, short quantity) {
        Cart cart = userRepository.findByEmail(email).getCart();
        CartItem cartItem = cart.getCartItems().stream().filter(i -> i.getProduct().getId() == product.getId()).collect(Collectors.toList()).get(0);
        System.out.println(cart.getCartItems());
        cartItem.setQuantity(quantity);
        System.out.println(cart.getCartItems());

        cartItemRepository.save(cartItem);

        cart.setPrice((float) cart.getCartItems().stream().map(i -> i.getProduct().getPrice() * i.getQuantity()).mapToDouble(Float::floatValue).sum());
        cart.setQuantity((short) cart.getCartItems().stream().map(CartItem::getQuantity).mapToInt(Short::shortValue).sum());

        cartRepository.save(cart);
        return cartItem;
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
