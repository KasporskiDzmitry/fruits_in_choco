package by.dz.fruits_in_choco.fruits_in_choco.dto;

import lombok.Data;

@Data
public class AuthenticationResponse {
    private String email;
    private String token;
    private String role;
    private String name;
}
