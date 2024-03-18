package by.dz.fruits_in_choco.fruits_in_choco.dto.auth;

import by.dz.fruits_in_choco.fruits_in_choco.dto.CartResponse;

public record AuthenticationResponse(
        Long id,
        String email,
        String token,
        String refreshToken,
        String role,
        String name,
        CartResponse cart
) {
}
