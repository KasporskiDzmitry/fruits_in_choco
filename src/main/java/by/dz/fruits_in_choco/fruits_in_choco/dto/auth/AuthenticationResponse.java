package by.dz.fruits_in_choco.fruits_in_choco.dto.auth;

import by.dz.fruits_in_choco.fruits_in_choco.entity.cart.Cart;
import lombok.Data;


@Data
public class AuthenticationResponse {
    private Long id;
    private String email;
    private String token;
    private String refreshToken;
    private String role;
    private String name;
    private Cart cart;
}
