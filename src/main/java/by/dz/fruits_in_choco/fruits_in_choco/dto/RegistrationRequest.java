package by.dz.fruits_in_choco.fruits_in_choco.dto;

import lombok.Data;

@Data
public class RegistrationRequest {
    private final String firstName;
    private final String lastName;
    private final String email;
    private final String password;
}
