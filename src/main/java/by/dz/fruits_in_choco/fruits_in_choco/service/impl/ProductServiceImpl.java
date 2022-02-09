package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductRatingRequest;
import by.dz.fruits_in_choco.fruits_in_choco.entity.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.ProductRating;
import by.dz.fruits_in_choco.fruits_in_choco.entity.ProductType;
import by.dz.fruits_in_choco.fruits_in_choco.entity.User;
import by.dz.fruits_in_choco.fruits_in_choco.repository.ProductRatingRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.ProductRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.ProductTypeRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.UserRepository;
import by.dz.fruits_in_choco.fruits_in_choco.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service("productService")
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ProductTypeRepository productTypeRepository;
    private final UserRepository userRepository;
    private final ProductRatingRepository productRatingRepository;

    public ProductServiceImpl(ProductRepository productRepository, UserRepository userRepository, ProductRatingRepository ratingRepository, ProductTypeRepository productTypeRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.productRatingRepository = ratingRepository;
        this.productTypeRepository = productTypeRepository;
    }

    @Override
    public List<Product> getProducts(int page, int size, String direction, String sortBy) {
        Page<Product> productPage = productRepository.findAll(PageRequest.of(page, size, Sort.Direction.fromString(direction), sortBy));
        return productPage.getContent();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).get();
    }

    @Override
    public List<Product> getProductsFilteredByTypes(List<Long> types) {
        List<Product> products = productRepository.findByType_IdIn(types);
        return products;
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
                    product.setType(newProduct.getType());
                    product.setRatings(newProduct.getRatings());
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
        List<ProductRating> ratings = product.getRatings();
        for (ProductRating rating : ratings) {
            User user = userRepository.findById(rating.getAuthorId()).get();
            List<ProductRating> userRatingsList = user.getRatings();
            userRatingsList.remove(rating);

        }

        ProductType productType = productTypeRepository.findById(product.getType().getId()).get();
        productType.getProducts().remove(product);

        productRepository.deleteById(id);
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

        return product;
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
