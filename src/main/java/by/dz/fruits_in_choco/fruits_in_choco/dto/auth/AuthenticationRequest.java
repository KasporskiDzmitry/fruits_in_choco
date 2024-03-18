package by.dz.fruits_in_choco.fruits_in_choco.dto.auth;

public record AuthenticationRequest(
        String email,
        String password
) { }