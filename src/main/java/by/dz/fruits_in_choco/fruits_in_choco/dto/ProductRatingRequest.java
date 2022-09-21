package by.dz.fruits_in_choco.fruits_in_choco.dto;

import lombok.Data;

@Data
public class ProductRatingRequest {
    private Short userId;
    private String author;
    private Short rating;
    private String message;
    private boolean approved;
}
