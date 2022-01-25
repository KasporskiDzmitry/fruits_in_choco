package by.dz.fruits_in_choco.fruits_in_choco.mapper;

import by.dz.fruits_in_choco.fruits_in_choco.dto.product.ProductResponse;
import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductTypeResponse;
import by.dz.fruits_in_choco.fruits_in_choco.entity.ProductType;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class ProductTypeMapper {
    private final ModelMapper modelMapper;
    private final ProductMapper productMapper;

    public ProductTypeResponse convertToResponseDTO(ProductType productType) {
        List<ProductResponse> productResponseList = productType.getProducts()
                .stream()
                .map(productMapper::mapToResponseDTO)
                .collect(Collectors.toList());

        ProductTypeResponse response = modelMapper.map(productType, ProductTypeResponse.class);
        response.setProducts(productResponseList);
        return response;
    }
}
