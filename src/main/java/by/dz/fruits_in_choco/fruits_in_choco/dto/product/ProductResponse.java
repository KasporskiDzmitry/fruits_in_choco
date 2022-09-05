package by.dz.fruits_in_choco.fruits_in_choco.dto.product;

import by.dz.fruits_in_choco.fruits_in_choco.entity.product.ProductRating;
import lombok.Data;

import java.util.List;

@Data
public class ProductResponse {
    private Short id;
    private String name;
    private String description;
    private int price;
    private String status;
    private String imageURL;
    private Short categoryId;
    private List<ProductRating> ratings;
}
