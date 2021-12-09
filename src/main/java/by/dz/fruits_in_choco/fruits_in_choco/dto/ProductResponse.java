package by.dz.fruits_in_choco.fruits_in_choco.dto;

import by.dz.fruits_in_choco.fruits_in_choco.entity.ProductRating;
import lombok.Data;

import java.util.List;

@Data
public class ProductResponse {
    private Long id;
    private String name;
    private String description;
    private int price;
    private Long typeId;
    private List<ProductRating> ratings;
}
