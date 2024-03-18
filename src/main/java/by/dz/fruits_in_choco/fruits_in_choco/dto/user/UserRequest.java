package by.dz.fruits_in_choco.fruits_in_choco.dto.user;

import by.dz.fruits_in_choco.fruits_in_choco.entity.product.ProductRating;

import java.util.List;

public record UserRequest(
        Long id,
        String firstName,
        String lastName,
        String email,
        List<ProductRating> ratings
) {
}
