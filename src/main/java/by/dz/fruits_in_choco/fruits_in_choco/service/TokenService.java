package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.entity.user.Token;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.TokenType;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;

import java.util.List;

public interface TokenService {
    Token createToken(User user, TokenType tokenType);
    void deleteTokensByUser(User user);
}
