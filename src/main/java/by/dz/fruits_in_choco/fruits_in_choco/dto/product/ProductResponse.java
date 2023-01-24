package by.dz.fruits_in_choco.fruits_in_choco.dto.product;

import by.dz.fruits_in_choco.fruits_in_choco.entity.product.ProductRating;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ProductResponse {
    private short id;
    private String name;
    private String description;
    private int price;
    private String status;
    private String imageURL;
    private short categoryId;
    private List<ProductRating> ratings;
    private Map<String, Object> attributes;
    private short avgRating;
}
