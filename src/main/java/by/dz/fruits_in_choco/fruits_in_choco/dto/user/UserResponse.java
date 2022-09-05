package by.dz.fruits_in_choco.fruits_in_choco.dto.user;

import by.dz.fruits_in_choco.fruits_in_choco.entity.cart.Cart;
import by.dz.fruits_in_choco.fruits_in_choco.entity.order.Order;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.ProductRating;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.Role;
import lombok.Data;

import java.util.List;

@Data
public class UserResponse {
    private Short id;
    private String firstName;
    private String lastName;
    private String email;
    private Role role;
    private String status;
    private List<ProductRating> ratings;
    private List<Order> orders;
    private Cart cart;
}
