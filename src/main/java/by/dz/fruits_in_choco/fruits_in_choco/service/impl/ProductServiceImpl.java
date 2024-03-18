package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.dto.Notification;
import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductRatingRequest;
import by.dz.fruits_in_choco.fruits_in_choco.entity.order.OrderItem;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.ProductRating;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.ProductStatus;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;
import by.dz.fruits_in_choco.fruits_in_choco.exception.EntityNotFoundException;
import by.dz.fruits_in_choco.fruits_in_choco.exception.ProductDeletedException;
import by.dz.fruits_in_choco.fruits_in_choco.repository.OrderItemRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.ProductRatingRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.ProductRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.UserRepository;
import by.dz.fruits_in_choco.fruits_in_choco.service.ProductService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

import static by.dz.fruits_in_choco.fruits_in_choco.security.AuthenticatedUserAuthorityAdminChecker.isAuthenticatedAndAdmin;
import static by.dz.fruits_in_choco.fruits_in_choco.util.Constants.NOTIFICATION_REVIEW;

@Service("productService")
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ProductRatingRepository productRatingRepository;
    private final OrderItemRepository orderItemRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;

    public ProductServiceImpl(ProductRepository productRepository, UserRepository userRepository, ProductRatingRepository ratingRepository, OrderItemRepository orderItemRepository, SimpMessagingTemplate simpMessagingTemplate) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.productRatingRepository = ratingRepository;
        this.orderItemRepository = orderItemRepository;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    private boolean isProductActive(Product p) {
        return p.getStatus().equals(ProductStatus.ACTIVE);
    }

    private Product filterUnapprovedRatings(Product product) {
        product.setRatings(Optional.ofNullable(product.getRatings())
                .orElseGet(Collections::emptyList)
                .stream()
                .filter(Objects::nonNull)
                .filter(ProductRating::isApproved)
                .collect(Collectors.toList())
        );

        return product;
    }

    @Override
    public List<Product> getProducts(int page, int size, String direction, String sortBy) {
        if (isAuthenticatedAndAdmin()) {
            return productRepository.findAll(PageRequest.of(page, size, Sort.Direction.fromString(direction), sortBy)).getContent();
        } else {
            List<Product> products = productRepository.findByStatus(ProductStatus.ACTIVE);
            return products.stream().map(this::filterUnapprovedRatings).collect(Collectors.toList());
        }
    }

    @Override
    public Product getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(Product.class.getSimpleName(), id));

        if (!isAuthenticatedAndAdmin()) {
            product = filterUnapprovedRatings(product);

            if (!isProductActive(product)) {
                throw new ProductDeletedException("Product deleted or not confirmed");
            }
        }

        return product;
    }

    @Override
    public List<Product> getProductsFilteredByCategories(List<Long> categories) {
        List<Product> products = productRepository.findByCategory_IdIn(categories);
        return products.stream().filter(this::isProductActive).map(this::filterUnapprovedRatings).collect(Collectors.toList());
    }

    @Override
    public Product saveProduct(Product newProduct) {
        return productRepository.save(newProduct);
    }

    @Override
    public Product updateProduct(Product newProduct, Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(Product.class.getSimpleName(), id));

        product.setName(newProduct.getName());
        product.setDescription(newProduct.getDescription());
        product.setPrice(newProduct.getPrice());
        product.setRatings(newProduct.getRatings());
        product.setStatus(newProduct.getStatus());
        product.setImageURL(newProduct.getImageURL());
        product.setAttributes(newProduct.getAttributes());
        product.setAvgRating(newProduct.getAvgRating());
        return productRepository.save(product);
    }

    @Override
    @Transactional
    public void deleteProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(Product.class.getSimpleName(), id));

        OrderItem orderItem = orderItemRepository.findByProduct_Id(id);

        if (orderItem != null) {
            product.setStatus(ProductStatus.DELETED);
        } else {
            List<ProductRating> ratings = product.getRatings();
            for (ProductRating rating : ratings) {
                User user = userRepository.findById(rating.getAuthorId())
                        .orElseThrow(() -> new EntityNotFoundException(User.class.getSimpleName(), rating.getAuthorId()));

                List<ProductRating> userRatingsList = user.getRatings();
                userRatingsList.remove(rating);
            }

            productRepository.deleteById(id);
        }
    }

    @Override
    @Transactional
    public Product rateProduct(ProductRatingRequest request, Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(Product.class.getSimpleName(), id));

        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new EntityNotFoundException(User.class.getSimpleName(), request.userId()));

        ProductRating rating = new ProductRating();

        rating.setAuthor(request.author());
        rating.setAuthorId(request.userId());
        rating.setRating(request.rating());
        rating.setMessage(request.message());
        rating.setDate(new Date());
        rating.setApproved(false);
        rating.setProduct(product);

        product.getRatings().add(rating);
        user.getRatings().add(rating);

        simpMessagingTemplate.convertAndSendToUser("admin", "/notification", new Notification(new Date(), NOTIFICATION_REVIEW));
        return filterUnapprovedRatings(product);
    }

    @Override
    @Transactional
    public Product approveReview(ProductRatingRequest newRating, Long productId, Long ratingId) {
        ProductRating rating = productRatingRepository.findById(ratingId)
                .orElseThrow(() -> new EntityNotFoundException(ProductRating.class.getSimpleName(), ratingId));

        rating.setApproved(newRating.approved());
        rating.setMessage(newRating.message());

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException(Product.class.getSimpleName(), productId));

        product.calcAverageRating();
        return product;
    }

    @Override
    @Transactional
    public void deleteProductRatingById(Long productId, Long ratingId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException(Product.class.getSimpleName(), productId));

        product.getRatings().removeIf(rating -> rating.getId() == ratingId);

        ProductRating rating = productRatingRepository.findById(ratingId)
                .orElseThrow(() -> new EntityNotFoundException(ProductRating.class.getSimpleName(), ratingId));

        product.calcAverageRating();

        Long userId = rating.getAuthorId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(User.class.getSimpleName(), userId));

        user.getRatings().removeIf(item -> item.getId() == ratingId);
    }
}
