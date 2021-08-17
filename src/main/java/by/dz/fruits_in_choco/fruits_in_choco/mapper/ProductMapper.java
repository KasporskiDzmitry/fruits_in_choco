package by.dz.fruits_in_choco.fruits_in_choco.mapper;

import by.dz.fruits_in_choco.fruits_in_choco.dto.product.ProductRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.product.ProductResponse;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductMapper {

    private final ModelMapper modelMapper;
    private final ProductService productService;

    private Product convertToEntity(ProductRequest request) {
        return modelMapper.map(request, Product.class);
    }

    ProductResponse convertToResponseDto(Product product) {
        return modelMapper.map(product, ProductResponse.class);
    }
}
