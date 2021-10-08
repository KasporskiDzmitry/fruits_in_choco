package by.dz.fruits_in_choco.fruits_in_choco.dto;

import lombok.Data;

@Data
public class ProductRatingRequest {
    private Long userId;
    private Long productId;
    private String author;
    private int rating;
    private String message;
}
