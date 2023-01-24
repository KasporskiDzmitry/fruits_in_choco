package by.dz.fruits_in_choco.fruits_in_choco.dto.auth;

import by.dz.fruits_in_choco.fruits_in_choco.entity.cart.Cart;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationResponse {
    private short id;
    private String email;
    private String token;
    private String refreshToken;
    private String role;
    private String name;
    private Cart cart;
}
