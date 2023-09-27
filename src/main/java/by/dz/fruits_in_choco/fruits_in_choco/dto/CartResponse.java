package by.dz.fruits_in_choco.fruits_in_choco.dto;

import by.dz.fruits_in_choco.fruits_in_choco.dto.product.ProductResponse;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;
import lombok.Data;

import java.util.List;

@Data
public class CartResponse {
    private Long id;
    private int quantity;
    private float price;
    private List<CartItemResponse> cartItems;
    private User user;

    @Data
    private static class CartItemResponse {
        private Long id;
        private int quantity;
        private ProductResponse product;
    }
}
