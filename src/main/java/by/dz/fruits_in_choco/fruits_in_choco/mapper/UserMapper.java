package by.dz.fruits_in_choco.fruits_in_choco.mapper;

import by.dz.fruits_in_choco.fruits_in_choco.dto.AuthenticationResponse;
import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductReviewRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.product.ProductResponse;
import by.dz.fruits_in_choco.fruits_in_choco.entity.User;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.productReview.ProductReview;
import by.dz.fruits_in_choco.fruits_in_choco.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {
    private final ModelMapper modelMapper;
    private final UserService userService;

    public Product addReviewToProduct(ProductReviewRequest request) {
        return userService.saveProductReview(convertToEntity(request));
    }

    private ProductReview convertToEntity(ProductReviewRequest request) {
        return modelMapper.map(request, ProductReview.class);
    }

}
