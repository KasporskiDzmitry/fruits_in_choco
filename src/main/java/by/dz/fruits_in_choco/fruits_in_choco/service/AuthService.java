package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.dto.auth.AuthenticationResponse;

import javax.servlet.http.HttpServletResponse;

public interface AuthService {
    AuthenticationResponse login(String email, HttpServletResponse response);
    String refreshToken(String refreshToken, HttpServletResponse response);
}
