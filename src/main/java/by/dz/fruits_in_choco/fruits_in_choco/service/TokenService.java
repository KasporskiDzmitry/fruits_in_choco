package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.entity.user.Token;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;

public interface TokenService {
    Token updateToken(User user);
    Token clearToken(User user);
    boolean verifyToken(String token);
}
