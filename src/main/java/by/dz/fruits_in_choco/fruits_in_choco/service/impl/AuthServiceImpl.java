package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.dto.AuthenticationResponse;
import by.dz.fruits_in_choco.fruits_in_choco.entity.User;
import by.dz.fruits_in_choco.fruits_in_choco.repository.UserRepository;
import by.dz.fruits_in_choco.fruits_in_choco.security.JwtTokenProvider;
import by.dz.fruits_in_choco.fruits_in_choco.service.AuthService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Service("authService")
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    @Value("${jwt.expiration}")
    private Long tokenValidity;
    @Value("${jwt.expirationRefresh}")
    private Long refreshTokenValidity;


    public AuthServiceImpl(UserRepository userRepository, JwtTokenProvider jwtTokenProvider, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AuthenticationResponse login(String email, HttpServletResponse response) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User doesn't exists");
        }

        String token = jwtTokenProvider.createToken(email, user.getRole().name(), tokenValidity);
        String refreshToken = jwtTokenProvider.createToken(email, user.getRole().name(), refreshTokenValidity);

        Cookie cookie = new Cookie("refreshToken",refreshToken);
        cookie.setMaxAge(Math.toIntExact(refreshTokenValidity));
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setPath("/auth/refreshToken");
        response.addCookie(cookie);

        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        authenticationResponse.setEmail(email);
        authenticationResponse.setToken(token);
        authenticationResponse.setRole(user.getRole().name());
        authenticationResponse.setName(user.getFirstName() + " " + user.getLastName());
        authenticationResponse.setId(user.getId());

        return authenticationResponse;
    }

    @Override
    public String refreshToken(String refreshToken, HttpServletResponse response) {
        User user = userRepository.findByEmail(jwtTokenProvider.getUsername(refreshToken));

        Cookie cookie = new Cookie("refreshToken", jwtTokenProvider.createToken(user.getEmail(), user.getRole().name(), refreshTokenValidity));
        cookie.setMaxAge(Math.toIntExact(refreshTokenValidity));
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setPath("/auth/refreshToken");
        response.addCookie(cookie);

        return jwtTokenProvider.createToken(user.getEmail(), user.getRole().name(), tokenValidity);
    }
}
