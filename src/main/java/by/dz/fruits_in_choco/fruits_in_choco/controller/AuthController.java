package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.dto.auth.AuthenticationRequest;
import by.dz.fruits_in_choco.fruits_in_choco.exception.EntityNotFoundException;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.AuthServiceImpl;
import by.dz.fruits_in_choco.fruits_in_choco.util.CookieHelper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")
@Slf4j
@AllArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final AuthServiceImpl authService;
    private final CookieHelper cookieHelper;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest request, HttpServletResponse response) {
        log.info("Login attempt: /login");
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
            return ResponseEntity.ok(authService.login(request.email(), response));
        } catch (DisabledException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(401).body("Account not confirmed");
        } catch (AuthenticationException | EntityNotFoundException e) {
            log.error("Login process for user with email " + request.email() + " failed", e);
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@CookieValue(name = "refreshToken") String refreshToken, HttpServletResponse response) {
        log.info("Generate new token pair: /refreshToken");
        try {
            return ResponseEntity.ok(authService.refreshToken(refreshToken, response));
        } catch (EntityNotFoundException e) {
            log.error("Unable to obtain refresh token", e);
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        log.info("Logout attempt: /logout");
        try {
            authService.logout(request, response);
            response.addHeader(HttpHeaders.SET_COOKIE, (cookieHelper.createRefreshTokenCookie(null, 0)));
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Logout process failed", e);
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/verify-token")
    public boolean verifyToken(HttpServletRequest request) {
        log.info("Verify access token: /verifyToken");
        return authService.verifyToken(request);
    }

}
