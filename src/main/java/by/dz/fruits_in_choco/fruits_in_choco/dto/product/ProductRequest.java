package by.dz.fruits_in_choco.fruits_in_choco.dto.product;

import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.ProductType;
import lombok.Data;

import java.util.List;

@Data
public class ProductRequest {
    private List<Integer> types;
}
