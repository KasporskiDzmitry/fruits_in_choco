package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.entity.user.Token;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.TokenType;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;
import by.dz.fruits_in_choco.fruits_in_choco.repository.TokenRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.UserRepository;
import by.dz.fruits_in_choco.fruits_in_choco.security.JwtTokenProvider;
import by.dz.fruits_in_choco.fruits_in_choco.service.TokenService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service("tokenService")
public class TokenServiceImpl implements TokenService {
    private final JwtTokenProvider tokenProvider;
    private final TokenRepository tokenRepository;
    @Value("${jwt.expiration}")
    private Long tokenValidity;
    @Value("${jwt.expirationRefresh}")
    private Long refreshTokenValidity;

    public TokenServiceImpl(JwtTokenProvider tokenProvider, TokenRepository tokenRepository, UserRepository userRepository) {
        this.tokenProvider = tokenProvider;
        this.tokenRepository = tokenRepository;
    }

    @Override
    public Token createToken(User user, TokenType tokenType) {
        Long validity = tokenType == TokenType.ACCESS ? tokenValidity : refreshTokenValidity;
        Token token = Token.builder()
                .token(tokenProvider.createToken(user.getEmail(), user.getRole().name(), validity))
                .tokenType(tokenType)
                .user(user)
                .build();
        return tokenRepository.save(token);
    }

    public void deleteTokensByUser(User user) {
        tokenRepository.deleteAll(user.getTokens());
    }
}
