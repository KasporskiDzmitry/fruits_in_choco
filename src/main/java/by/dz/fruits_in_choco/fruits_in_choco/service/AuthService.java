package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.dto.AuthenticationResponse;
import by.dz.fruits_in_choco.fruits_in_choco.dto.RefreshTokenResponse;

import javax.servlet.http.HttpServletResponse;

public interface AuthService {
    AuthenticationResponse login(String email, HttpServletResponse response);
    String refreshToken(String refreshToken, HttpServletResponse response);
}
