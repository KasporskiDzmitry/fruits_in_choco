package by.dz.fruits_in_choco.fruits_in_choco.dto.product;

import by.dz.fruits_in_choco.fruits_in_choco.entity.product.ProductType;
import by.dz.fruits_in_choco.fruits_in_choco.entity.productReview.ProductReview;
import lombok.Data;

import java.util.List;

@Data
public class ProductResponse {
    private int id;
    private String name;
    private String description;
    private int price;
    private ProductType productType;
    private List<ProductReview> reviews;
}
