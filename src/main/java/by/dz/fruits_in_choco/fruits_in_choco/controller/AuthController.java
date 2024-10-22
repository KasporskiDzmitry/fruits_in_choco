package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.dto.auth.AuthenticationRequest;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.AuthServiceImpl;
import by.dz.fruits_in_choco.fruits_in_choco.util.CookieHelper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
@Slf4j
@AllArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final AuthServiceImpl authService;
    private final CookieHelper cookieHelper;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthenticationRequest request, HttpServletResponse response) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        return ResponseEntity.ok(authService.login(request.email(), response));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@CookieValue(name = "refreshToken") String refreshToken, HttpServletResponse response) {
        return ResponseEntity.ok(authService.refreshToken(refreshToken, response));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        authService.logout(request, response);
        response.addHeader(HttpHeaders.SET_COOKIE, (cookieHelper.createRefreshTokenCookie(null, 0)));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/verify-token")
    public boolean verifyToken(HttpServletRequest request) {
        return authService.verifyToken(request);
    }
}
