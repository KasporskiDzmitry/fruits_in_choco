package by.dz.fruits_in_choco.fruits_in_choco.dto;

import by.dz.fruits_in_choco.fruits_in_choco.dto.product.ProductResponse;
import lombok.Data;

import java.util.List;

@Data
public class ProductTypeResponse {
    private Long id;
    private String name;
    private List<ProductResponse> products;
}
