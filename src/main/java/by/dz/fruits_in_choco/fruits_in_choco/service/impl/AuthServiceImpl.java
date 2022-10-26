package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.dto.auth.AuthenticationResponse;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.Status;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;
import by.dz.fruits_in_choco.fruits_in_choco.exception.UserNotConfirmedException;
import by.dz.fruits_in_choco.fruits_in_choco.exception.EntityNotFoundException;
import by.dz.fruits_in_choco.fruits_in_choco.repository.UserRepository;
import by.dz.fruits_in_choco.fruits_in_choco.security.JwtTokenProvider;
import by.dz.fruits_in_choco.fruits_in_choco.service.AuthService;
import by.dz.fruits_in_choco.fruits_in_choco.util.CookieCreator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;

@Service("authService")
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    @Value("${jwt.expiration}")
    private Long tokenValidity;
    @Value("${jwt.expirationRefresh}")
    private Long refreshTokenValidity;


    public AuthServiceImpl(UserRepository userRepository, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public AuthenticationResponse login(String email, HttpServletResponse response) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new EntityNotFoundException("User doesn't exist");
        }
        if (user.getStatus() == Status.NOT_CONFIRMED) {
            throw new UserNotConfirmedException("Account not confirmed");
        }

        String token = jwtTokenProvider.createToken(email, user.getRole().name(), tokenValidity);
        String refreshToken = jwtTokenProvider.createToken(email, user.getRole().name(), refreshTokenValidity);

        response.addCookie(CookieCreator.createRefreshTokenCookie(refreshToken, Math.toIntExact(refreshTokenValidity)));

        return AuthenticationResponse.builder().email(email)
                .token(token)
                .role(user.getRole().name())
                .name(user.getFirstName() + " " + user.getLastName())
                .id(user.getId())
                .cart(user.getCart())
                .build();
    }

    @Override
    public String refreshToken(String refreshToken, HttpServletResponse response) {
        User user = userRepository.findByEmail(jwtTokenProvider.getUsername(refreshToken));

        if (null == user) {
            throw new EntityNotFoundException("User doesn't exist");
        }

        response.addCookie(CookieCreator.createRefreshTokenCookie(
                jwtTokenProvider.createToken(user.getEmail(), user.getRole().name(), refreshTokenValidity),
                Math.toIntExact(refreshTokenValidity)));
        return jwtTokenProvider.createToken(user.getEmail(), user.getRole().name(), tokenValidity);
    }
}
