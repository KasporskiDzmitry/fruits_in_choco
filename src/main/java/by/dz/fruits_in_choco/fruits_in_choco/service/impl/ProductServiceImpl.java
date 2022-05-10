package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.dto.Notification;
import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductRatingRequest;
import by.dz.fruits_in_choco.fruits_in_choco.entity.order.OrderItem;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.ProductRating;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.ProductStatus;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;
import by.dz.fruits_in_choco.fruits_in_choco.exception.ProductDeletedException;
import by.dz.fruits_in_choco.fruits_in_choco.repository.*;
import by.dz.fruits_in_choco.fruits_in_choco.service.ProductService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static by.dz.fruits_in_choco.fruits_in_choco.security.AuthenticatedUserAuthorityAdminChecker.isAuthenticatedAndAdmin;

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
        Product product = productRepository.findById(id).orElse(null);

        if (product == null) {
            throw new NoSuchElementException("Продукт не найден");
        }

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
        return productRepository.findById(id)
                .map(product -> {
                    product.setName(newProduct.getName());
                    product.setDescription(newProduct.getDescription());
                    product.setPrice(newProduct.getPrice());
                    product.setRatings(newProduct.getRatings());
                    product.setStatus(newProduct.getStatus());
                    product.setImageURL(newProduct.getImageURL());
                    return productRepository.save(product);
                })
                .orElseGet(() -> {
                    newProduct.setId(id);
                    return productRepository.save(newProduct);
                });
    }

    @Override
    public void deleteProductById(Long id) {
        Product product = productRepository.findById(id).get();
        OrderItem orderItem = orderItemRepository.findByProduct_Id(id);

        if (orderItem != null) {
            product.setStatus(ProductStatus.DELETED);
            productRepository.save(product);
        } else {
            List<ProductRating> ratings = product.getRatings();
            for (ProductRating rating : ratings) {
                User user = userRepository.findById(rating.getAuthorId()).get();
                List<ProductRating> userRatingsList = user.getRatings();
                userRatingsList.remove(rating);
            }

            productRepository.deleteById(id);
        }
    }

    @Override
    public Product rateProduct(ProductRatingRequest request, Long id) {
        Product product = productRepository.findById(id).get();
        User user = userRepository.findById(request.getUserId()).get();

        ProductRating rating = new ProductRating();

        rating.setAuthor(request.getAuthor());
        rating.setAuthorId(request.getUserId());
        rating.setRating(request.getRating());
        rating.setMessage(request.getMessage());
        rating.setDate(new Date());
        rating.setApproved(false);

        product.getRatings().add(rating);
        user.getRatings().add(rating);

        productRatingRepository.save(rating);

        Notification notification = new Notification();
        notification.setDate(new Date());
        notification.setType("REVIEW");

        simpMessagingTemplate.convertAndSendToUser("admin", "/notification", notification);

        return filterUnapprovedRatings(product);
    }

    @Override
    public Product approveReview(ProductRatingRequest newRating, Long productId, Long ratingId) {
        ProductRating rating = productRatingRepository.findById(ratingId).get();

        rating.setApproved(newRating.isApproved());
        rating.setMessage(newRating.getMessage());

        productRatingRepository.save(rating);
        return productRepository.findById(productId).get();
    }

    @Override
    public void deleteProductRatingById(Long productId, Long ratingId) {
        Product product = productRepository.findById(productId).get();
        product.getRatings().removeIf(rating -> rating.getId().equals(ratingId));

        User user = userRepository.findById(productRatingRepository.findById(ratingId).get().getAuthorId()).get();
        user.getRatings().removeIf(rating -> rating.getId().equals(ratingId));

        productRatingRepository.deleteById(ratingId);
    }
}
