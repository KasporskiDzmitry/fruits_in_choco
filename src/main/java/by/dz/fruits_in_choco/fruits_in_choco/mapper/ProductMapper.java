package by.dz.fruits_in_choco.fruits_in_choco.mapper;

import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductResponse;
import by.dz.fruits_in_choco.fruits_in_choco.entity.Product;
import by.dz.fruits_in_choco.fruits_in_choco.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import javax.print.attribute.standard.Destination;
import java.util.List;
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

    public ProductResponse mapToResponseDTO(Product product) {
        modelMapper.typeMap(Product.class, ProductResponse.class).addMappings(mapper -> {
            mapper.map(src -> src.getType().getId(), ProductResponse::setTypeId);
        });
        return modelMapper.map(product, ProductResponse.class);
    }

}
