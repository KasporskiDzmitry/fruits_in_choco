package by.dz.fruits_in_choco.fruits_in_choco.dto.product;

import by.dz.fruits_in_choco.fruits_in_choco.entity.product.ProductRating;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.ProductStatus;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ProductRequest {
    private Short categoryId;
    private String description;
    private Short id;
    private String imageURL;
    private String name;
    private List<ProductRating> ratings;
    private ProductStatus status;
    private Short quantity;
    private float price;
    private Map<String, Object> attributes;
}
