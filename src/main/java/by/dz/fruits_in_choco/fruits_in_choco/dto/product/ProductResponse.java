package by.dz.fruits_in_choco.fruits_in_choco.dto.product;

import by.dz.fruits_in_choco.fruits_in_choco.entity.ProductRating;
import lombok.Data;

import java.util.List;

@Data
public class ProductResponse {
    private Long id;
    private String name;
    private String description;
    private int price;
    private String imageURL;
    private Long typeId;
    private Long categoryId;
    private List<ProductRating> ratings;
}
