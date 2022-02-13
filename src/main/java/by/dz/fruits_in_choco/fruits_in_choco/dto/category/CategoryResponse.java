package by.dz.fruits_in_choco.fruits_in_choco.dto.category;

import by.dz.fruits_in_choco.fruits_in_choco.entity.Product;
import lombok.Data;

import java.util.List;

@Data
public class CategoryResponse {
    private Long id;
    private String name;
    private String description;
    private String imageURL;
    private List<Product> products;
}
