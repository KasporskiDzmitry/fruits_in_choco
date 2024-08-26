package by.dz.fruits_in_choco.fruits_in_choco.security;

import by.dz.fruits_in_choco.fruits_in_choco.entity.user.Token;
import by.dz.fruits_in_choco.fruits_in_choco.exception.JwtAuthenticationException;
import by.dz.fruits_in_choco.fruits_in_choco.repository.TokenRepository;
import by.dz.fruits_in_choco.fruits_in_choco.util.CookieHelper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static by.dz.fruits_in_choco.fruits_in_choco.util.Constants.REFRESH_TOKEN_COOKIE;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {
    private final JwtTokenProvider jwtTokenProvider;
    private final TokenRepository tokenRepository;

    public JwtTokenFilter(JwtTokenProvider jwtTokenProvider, TokenRepository tokenRepository) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.tokenRepository = tokenRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        String refreshToken = CookieHelper.getCookieValue(httpServletRequest, REFRESH_TOKEN_COOKIE);

        String token = jwtTokenProvider.resolveToken(httpServletRequest);
        Token tokenFromDB;

        if (refreshToken != null) {
            token = refreshToken;
            tokenFromDB = tokenRepository.findByRefresh(refreshToken);
        } else {
            tokenFromDB = tokenRepository.findByAccess(token);
        }

        try {
            if (token != null && tokenFromDB != null && jwtTokenProvider.validateToken(token)) {
                Authentication authentication = jwtTokenProvider.getAuthentication(token);
                if (authentication != null) {
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        } catch (JwtAuthenticationException e) {
            SecurityContextHolder.clearContext();
            (httpServletResponse).sendError(e.getHttpStatus().value());
            throw new JwtAuthenticationException("JWT token is expired or invalid");
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
