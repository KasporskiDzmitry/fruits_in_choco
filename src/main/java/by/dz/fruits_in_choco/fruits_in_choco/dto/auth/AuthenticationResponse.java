package by.dz.fruits_in_choco.fruits_in_choco.dto.auth;

import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import lombok.Data;

import java.util.List;

@Data
public class AuthenticationResponse {
    private Long id;
    private String email;
    private String token;
    private String refreshToken;
    private String role;
    private String name;
    private List<Product> cart;
}
