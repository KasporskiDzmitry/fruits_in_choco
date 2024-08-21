package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.entity.user.Token;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;
import by.dz.fruits_in_choco.fruits_in_choco.repository.TokenRepository;
import by.dz.fruits_in_choco.fruits_in_choco.security.JwtTokenProvider;
import by.dz.fruits_in_choco.fruits_in_choco.service.TokenService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service("tokenService")
@Slf4j
public class TokenServiceImpl implements TokenService {
    private final JwtTokenProvider tokenProvider;
    private final TokenRepository tokenRepository;
    @Value("${jwt.expiration}")
    private Long accessTokenValidity;
    @Value("${jwt.expirationRefresh}")
    private Long refreshTokenValidity;

    public TokenServiceImpl(JwtTokenProvider tokenProvider, TokenRepository tokenRepository) {
        this.tokenProvider = tokenProvider;
        this.tokenRepository = tokenRepository;
    }

    @Override
    public Token updateToken(User user) {
        Token token = user.getToken();
        token.setAccess(tokenProvider.createToken(user.getEmail(), user.getRole().name(), accessTokenValidity));
        token.setRefresh(tokenProvider.createToken(user.getEmail(), user.getRole().name(), refreshTokenValidity));

        return tokenRepository.save(token);
    }

    @Override
    public Token clearToken(User user) {
        Token token = user.getToken();
        token.setAccess(null);
        token.setRefresh(null);

        return tokenRepository.save(token);
    }

    @Override
    public boolean verifyToken(String token) {
        return tokenProvider.validateToken(token);
    }
}
