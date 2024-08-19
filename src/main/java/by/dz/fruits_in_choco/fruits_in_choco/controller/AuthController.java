package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.dto.auth.AuthenticationRequest;
import by.dz.fruits_in_choco.fruits_in_choco.exception.EntityNotFoundException;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.AuthServiceImpl;
import by.dz.fruits_in_choco.fruits_in_choco.util.CookieCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/v1/auth")
@Slf4j
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final AuthServiceImpl authService;
    private final CookieCreator cookieCreator;

    public AuthController(AuthenticationManager authenticationManager, AuthServiceImpl authService, CookieCreator cookieCreator) {
        this.authenticationManager = authenticationManager;
        this.authService = authService;
        this.cookieCreator = cookieCreator;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest request, HttpServletResponse response) {
        log.info("Login request");
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
            return ResponseEntity.ok(authService.login(request.email(), response));
        } catch (AuthenticationException | EntityNotFoundException e) {
            log.error("Login process for user with email " + request.email() + " failed", e);
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

    @PostMapping("/refreshToken")
    public ResponseEntity<?> refreshToken(@CookieValue(name = "refreshToken") String refreshToken, HttpServletResponse response) {
        log.info("/refreshToken");
        try {
            return ResponseEntity.ok(authService.refreshToken(refreshToken, response));
        } catch (EntityNotFoundException e) {
            log.error("Unable to obtain refresh token", e);
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')") // оставить только USER?
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        try {
            authService.logout(request, response);
            response.addCookie(cookieCreator.createRefreshTokenCookie(null, 0));
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Logout process failed", e);
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

}
