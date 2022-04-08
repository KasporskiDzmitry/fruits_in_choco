package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.dto.product.ProductRequest;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;
import by.dz.fruits_in_choco.fruits_in_choco.repository.ProductRatingRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.ProductRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.UserRepository;
import by.dz.fruits_in_choco.fruits_in_choco.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userService")
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ProductRatingRepository productRatingRepository;
    private final ProductRepository productRepository;

    public UserServiceImpl(UserRepository userRepository, ProductRatingRepository productRatingRepository, ProductRepository productRepository) {
        this.productRatingRepository = productRatingRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
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
    public Product addToCart(Product product, String email) {
        User user = userRepository.findByEmail(email);
        user.getProducts().add(product);
        userRepository.save(user);
        return product;
    }

    @Override
    public void deleteFromCart(Long id, String email) {
        User user = userRepository.findByEmail(email);
        user.getProducts().removeIf(p -> p.getId() == id);
        userRepository.save(user);
    }

}
