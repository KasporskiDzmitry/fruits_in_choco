package by.dz.fruits_in_choco.fruits_in_choco.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ProductRatingRequest {
    private Long userId;
    private Long productId;
    private String author;
    private int rating;
    private String message;
    private boolean approved;
}
