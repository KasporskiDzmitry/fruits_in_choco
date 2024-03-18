package by.dz.fruits_in_choco.fruits_in_choco.dto;

public record RegistrationRequest(
        String firstName,
        String lastName,
        String email,
        String password
) {
}
