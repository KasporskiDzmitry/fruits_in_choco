package by.dz.fruits_in_choco.fruits_in_choco.dto;

import lombok.Data;

@Data
public class AuthenticationRequest {
    private String email;
    private String password;
}
