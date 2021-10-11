package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.dto.AuthenticationResponse;

import java.util.Map;

public interface AuthService {
    AuthenticationResponse login(String email);
}
