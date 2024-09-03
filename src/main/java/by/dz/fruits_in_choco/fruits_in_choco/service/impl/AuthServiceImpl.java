package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.dto.auth.AuthenticationResponse;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.Status;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.Token;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;
import by.dz.fruits_in_choco.fruits_in_choco.exception.EntityNotFoundException;
import by.dz.fruits_in_choco.fruits_in_choco.exception.UserNotConfirmedException;
import by.dz.fruits_in_choco.fruits_in_choco.repository.UserRepository;
import by.dz.fruits_in_choco.fruits_in_choco.security.JwtTokenProvider;
import by.dz.fruits_in_choco.fruits_in_choco.service.AuthService;
import by.dz.fruits_in_choco.fruits_in_choco.service.TokenService;
import by.dz.fruits_in_choco.fruits_in_choco.util.CookieHelper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service("authService")
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    @Value("${jwt.expirationRefresh}")
    private Long refreshTokenValidity;
    private final CookieHelper cookieHelper;
    private final TokenService tokenService;

    public AuthServiceImpl(UserRepository userRepository, JwtTokenProvider jwtTokenProvider, CookieHelper cookieHelper, TokenService tokenService) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.cookieHelper = cookieHelper;
        this.tokenService = tokenService;
    }

    @Override
    public AuthenticationResponse login(String email, HttpServletResponse response) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User doesn't exist"));

        if (user.getStatus() == Status.NOT_CONFIRMED) {
            throw new UserNotConfirmedException("Account not confirmed");
        }

        Token token = tokenService.updateToken(user);

        response.addCookie(cookieHelper.createRefreshTokenCookie(token.getRefresh(), Math.toIntExact(refreshTokenValidity)));

        return new AuthenticationResponse(
                user.getId(),
                email,
                token.getAccess(),
                null,
                user.getRole().name(),
                user.getFirstName() + " " + user.getLastName()
        );
    }

    @Override
    public synchronized String refreshToken(String refreshToken, HttpServletResponse response) {
        User user = userRepository.findByEmail(jwtTokenProvider.parseClaims(refreshToken).getSubject())
                .orElseThrow(() -> new EntityNotFoundException("User doesn't exist"));

        Token token = tokenService.updateToken(user);

        response.addCookie(cookieHelper.createRefreshTokenCookie(
                token.getRefresh(),
                Math.toIntExact(refreshTokenValidity)));
        return token.getAccess();
    }

    public void logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            tokenService.clearToken(userRepository.findByEmail(authentication.getName()).get());
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        }
    }

    @Override
    public boolean verifyToken(HttpServletRequest request) {
        return tokenService.verifyToken(request.getHeader("Authorization"));
    }
}
