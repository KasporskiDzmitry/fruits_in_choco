package by.dz.fruits_in_choco.fruits_in_choco.dto.order;

import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import lombok.Data;

@Data
public class OrderItemResponse {
    private short id;
    private Integer quantity;
    private Product product;
}
