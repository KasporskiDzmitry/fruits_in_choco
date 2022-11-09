package by.dz.fruits_in_choco.fruits_in_choco.dto;

import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import lombok.Data;

import java.util.Date;

@Data
public class ProductRatingResponse {
    private Short id;
    private Short authorId;
    private String author;
    private Short rating;
    private Product product;
    private String message;
    private boolean approved;
    private Date date;
}
