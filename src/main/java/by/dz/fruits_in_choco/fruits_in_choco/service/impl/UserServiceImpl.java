package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.entity.User;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.productReview.ProductReview;
import by.dz.fruits_in_choco.fruits_in_choco.repository.ProductRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.ProductReviewRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.UserRepository;
import by.dz.fruits_in_choco.fruits_in_choco.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userService")
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private ProductReviewRepository productReviewRepository;
    private ProductRepository productRepository;

    public UserServiceImpl(UserRepository userRepository, ProductReviewRepository productReviewRepository, ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.productReviewRepository = productReviewRepository;
    }

    public User getUser(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Product saveProductReview(ProductReview review, int productId, int reviewerId) {
        Product product = productRepository.findById(productId);
        User user = userRepository.findById(reviewerId);

        List<ProductReview> productReviews = product.getReviews();
        List<ProductReview> userReviews = user.getReviews();
        productReviews.add(review);
        userReviews.add(review);
        productReviewRepository.save(review);
        return product;
    }
}
