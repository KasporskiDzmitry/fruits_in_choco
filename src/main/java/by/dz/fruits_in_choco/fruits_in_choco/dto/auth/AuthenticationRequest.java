package by.dz.fruits_in_choco.fruits_in_choco.dto.auth;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public record AuthenticationRequest(
        @Email
        String email,

        @NotBlank
        String password
) {
}