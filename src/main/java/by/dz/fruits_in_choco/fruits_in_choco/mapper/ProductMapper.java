package by.dz.fruits_in_choco.fruits_in_choco.mapper;

import by.dz.fruits_in_choco.fruits_in_choco.dto.product.ProductRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.product.ProductResponse;
import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductRatingRequest;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.service.CategoryService;
import by.dz.fruits_in_choco.fruits_in_choco.service.ProductService;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.CategoryServiceImpl;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.ProductServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductMapper {

    private final ProductService service;
    private final ModelMapper modelMapper;
    private final CategoryService categoryService;

    public ProductMapper(ProductServiceImpl service, ModelMapper modelMapper, CategoryServiceImpl categoryService) {
        this.service = service;
        this.modelMapper = modelMapper;
        this.categoryService = categoryService;
    }

    public List<ProductResponse> getProducts(int page, int size, String direction, String sortBy) {
        List<Product> products = service.getProducts(page, size, direction, sortBy);
        return products.stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public ProductResponse getProductById(Short id) {
        return mapToResponseDTO(service.getProductById(id));
    }

    public List<ProductResponse> getProductsFilteredByCategories(List<Short> categories) {
        List<Product> products = service.getProductsFilteredByCategories(categories);
        return products.stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public ProductResponse saveProduct(Product product) {
        return mapToResponseDTO(service.saveProduct(product));
    }

    public ProductResponse rateProduct(ProductRatingRequest request, Short id) {
        return mapToResponseDTO(service.rateProduct(request, id));
    }

    public ProductResponse mapToResponseDTO(Product product) {
        modelMapper.typeMap(Product.class, ProductResponse.class).addMappings(mapper -> {
            mapper.map(src -> src.getCategory().getId(), ProductResponse::setCategoryId);
        });
        return modelMapper.map(product, ProductResponse.class);
    }

    public Product mapToEntity(ProductRequest request) {
        modelMapper.typeMap(ProductRequest.class, Product.class).addMappings(mapper -> {
            mapper.map(src -> categoryService.getCategoryById(request.getCategoryId()), Product::setCategory);
        });
        return modelMapper.map(request, Product.class);
    }
}
