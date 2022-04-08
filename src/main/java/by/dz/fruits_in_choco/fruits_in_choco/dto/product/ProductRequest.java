package by.dz.fruits_in_choco.fruits_in_choco.dto.product;

import by.dz.fruits_in_choco.fruits_in_choco.entity.product.ProductRating;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.ProductStatus;
import lombok.Data;

import java.util.List;

@Data
public class ProductRequest {
    private Long categoryId;
    private String description;
    private Long id;
    private String imageURL;
    private String name;
    private List<ProductRating> ratings;
    private ProductStatus status;
}
