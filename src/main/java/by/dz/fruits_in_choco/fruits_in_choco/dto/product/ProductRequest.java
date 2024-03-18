package by.dz.fruits_in_choco.fruits_in_choco.dto.product;

import by.dz.fruits_in_choco.fruits_in_choco.entity.product.ProductRating;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.ProductStatus;

import java.util.List;
import java.util.Map;

public record ProductRequest(
        Long categoryId,
        String description,
        Long id,
        String imageURL,
        String name,
        List<ProductRating> ratings,
        ProductStatus status,
        int quantity,
        float price,
        Map<String, Object> attributes,
        int avgRating
) {
}
