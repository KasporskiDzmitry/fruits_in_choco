package by.dz.fruits_in_choco.fruits_in_choco.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ProductReviewRequest {

    int reviewerId;
    int productId;

    String reviewer;
    String text;
    int stars;
    Date datetime;
}
