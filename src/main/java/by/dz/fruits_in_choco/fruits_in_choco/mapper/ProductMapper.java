package by.dz.fruits_in_choco.fruits_in_choco.mapper;

import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductRatingRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.product.ProductResponse;
import by.dz.fruits_in_choco.fruits_in_choco.entity.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.ProductRating;
import by.dz.fruits_in_choco.fruits_in_choco.entity.ProductStatus;
import by.dz.fruits_in_choco.fruits_in_choco.exception.ProductDeletedException;
import by.dz.fruits_in_choco.fruits_in_choco.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ProductMapper {

    private final ProductService service;
    private final ModelMapper modelMapper;

    public List<ProductResponse> getProducts(int page, int size, String direction, String sortBy) {
        List<Product> products = service.getProducts(page, size, direction, sortBy);
        return products.stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public ProductResponse getProductById(Long id) {
        Product product = service.getProductById(id);
        if (!isAdmin()) {
            if (product.getStatus().equals(ProductStatus.DELETED)) {
                throw new ProductDeletedException("Product was deleted");
            }
        }
        return mapToResponseDTO(product);
    }

    public List<ProductResponse> getProductsFilteredByCategories(List<Long> categories) {
        List<Product> products = service.getProductsFilteredByCategories(categories);
        return products.stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public ProductResponse rateProduct(ProductRatingRequest request, Long id) {
        return mapToResponseDTO(service.rateProduct(request, id));
    }

    private boolean isAdmin() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"));
    }

    public ProductResponse mapToResponseDTO(Product product) {
        if (isAdmin()) {
            return mapForAdmin(product);
        } else {
            return mapForUser(product);
        }
    }

    private ProductResponse mapForUser(Product product) {
        ProductResponse productResponse = mapForAdmin(product);

        List<ProductRating> productRatings = Optional.ofNullable(product.getRatings())
                .orElseGet(Collections::emptyList)
                .stream()
                .filter(Objects::nonNull)
                .filter(ProductRating::isApproved)
                .collect(Collectors.toList());

        productResponse.setRatings(productRatings);
        return productResponse;
    }

    private ProductResponse mapForAdmin(Product product) {
        modelMapper.typeMap(Product.class, ProductResponse.class).addMappings(mapper -> {
            mapper.map(src -> src.getCategory().getId(),
                    ProductResponse::setCategoryId);
        });
        return modelMapper.map(product, ProductResponse.class);
    }
}
