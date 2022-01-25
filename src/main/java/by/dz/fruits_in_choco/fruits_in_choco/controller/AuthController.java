package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.dto.auth.AuthenticationRequest;
import by.dz.fruits_in_choco.fruits_in_choco.exception.UserNotConfirmedException;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.AuthServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final AuthServiceImpl authService;

    public AuthController(AuthenticationManager authenticationManager, AuthServiceImpl authService) {
        this.authenticationManager = authenticationManager;
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest request, HttpServletResponse response) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            return ResponseEntity.ok(authService.login(request.getEmail(), response));
        } catch (AuthenticationException | UserNotConfirmedException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

    @PostMapping("/refreshToken")
    public ResponseEntity<?> refreshToken(@CookieValue(name = "refreshToken") String refreshToken, HttpServletResponse response) {
        return ResponseEntity.ok(authService.refreshToken(refreshToken, response));
    }

    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')") // оставить только USER?
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        SecurityContextLogoutHandler securityContextLogoutHandler = new SecurityContextLogoutHandler();
        securityContextLogoutHandler.logout(request, response, null);

        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setMaxAge(0);
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setPath("/auth/refreshToken");
        response.addCookie(cookie);
        return ResponseEntity.ok().build();
    }
}
