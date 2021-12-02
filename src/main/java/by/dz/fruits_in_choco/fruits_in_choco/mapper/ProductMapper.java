package by.dz.fruits_in_choco.fruits_in_choco.mapper;

import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductResponse;
import by.dz.fruits_in_choco.fruits_in_choco.dto.RegistrationRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.UserRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.UserResponse;
import by.dz.fruits_in_choco.fruits_in_choco.entity.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.User;
import by.dz.fruits_in_choco.fruits_in_choco.service.ProductService;
import by.dz.fruits_in_choco.fruits_in_choco.service.RegistrationService;
import by.dz.fruits_in_choco.fruits_in_choco.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ProductMapper {

    private final ProductService service;

    public List<ProductResponse> getProducts(int page, int size, String direction, String sortBy) {
        List<Product> products = service.getProducts(page, size, direction, sortBy);

        System.out.println(products);

        return products.stream()
                .map(product -> {
                    ProductResponse response = new ProductResponse();

                    response.setId(product.getId());
                    response.setName(product.getName());
                    response.setDescription(product.getDescription());
                    response.setPrice(product.getPrice());
                    response.setTypeId(product.getType().getId());
                    return response;
                })
                .collect(Collectors.toList());
    }
}
