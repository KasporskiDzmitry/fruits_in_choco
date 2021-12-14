package by.dz.fruits_in_choco.fruits_in_choco.mapper;

import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductRatingRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductResponse;
import by.dz.fruits_in_choco.fruits_in_choco.entity.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.ProductRating;
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
        return mapToResponseDTO(service.getProductById(id));
    }

    public List<ProductResponse> getProductsFilteredByTypes(List<Long> types) {
        List<Product> products = service.getProductsFilteredByTypes(types);

        return products.stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public ProductResponse rateProduct(ProductRatingRequest request, Long id) {
        return mapToResponseDTO(service.rateProduct(request, id));
    }


    public ProductResponse mapToResponseDTO(Product product) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            return generalMap(product);
        } else {
            return mapForUser(product);
        }
    }

    private ProductResponse mapForUser(Product product) {
        ProductResponse productResponse = generalMap(product);

        List<ProductRating> productRatings = Optional.ofNullable(product.getRatings())
                .orElseGet(Collections::emptyList)
                .stream()
                .filter(Objects::nonNull)
                .filter(ProductRating::isApproved)
                .collect(Collectors.toList());

        productResponse.setRatings(productRatings);
        return productResponse;
    }

    private ProductResponse generalMap(Product product) {
        modelMapper.typeMap(Product.class, ProductResponse.class).addMappings(mapper -> {
            mapper.map(src -> src.getType().getId(),
                    ProductResponse::setTypeId);
            mapper.map(src -> src.getType().getCategory().getId(),
                    ProductResponse::setCategoryId);
        });
        return modelMapper.map(product, ProductResponse.class);
    }
}
