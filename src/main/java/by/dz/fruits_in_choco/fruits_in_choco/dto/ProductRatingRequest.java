package by.dz.fruits_in_choco.fruits_in_choco.dto;

import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import lombok.Data;

@Data
public class ProductRatingRequest {
    private Long userId;
    private Product product;
    private String author;
    private int rating;
    private String message;
    private boolean approved;
}
