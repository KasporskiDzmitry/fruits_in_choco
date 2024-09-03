package by.dz.fruits_in_choco.fruits_in_choco.filter;

import by.dz.fruits_in_choco.fruits_in_choco.exception.JwtAuthenticationException;
import by.dz.fruits_in_choco.fruits_in_choco.repository.TokenRepository;
import by.dz.fruits_in_choco.fruits_in_choco.security.JwtTokenProvider;
import by.dz.fruits_in_choco.fruits_in_choco.util.CookieHelper;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static by.dz.fruits_in_choco.fruits_in_choco.util.Constants.REFRESH_TOKEN_COOKIE;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {
    private final JwtTokenProvider jwtTokenProvider;
    private final TokenRepository tokenRepository;
    private final String REFRESH_TOKEN_URI = "/api/v1/auth/refresh-token";
    private final ObjectMapper mapper;

    public JwtTokenFilter(JwtTokenProvider jwtTokenProvider, TokenRepository tokenRepository, ObjectMapper mapper) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.tokenRepository = tokenRepository;
        this.mapper = mapper;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        String receivedToken;

        if (httpServletRequest.getRequestURI().equals(REFRESH_TOKEN_URI)) {
            receivedToken = CookieHelper.getCookieValue(httpServletRequest, REFRESH_TOKEN_COOKIE);
        } else {
            receivedToken = jwtTokenProvider.resolveToken(httpServletRequest);
        }

        if (receivedToken != null) {
            try {
                jwtTokenProvider.validateToken(receivedToken);

                if (tokenRepository.existsByAccessOrRefresh(receivedToken, receivedToken)) {
                    Claims claims = jwtTokenProvider.parseClaims(receivedToken);
                    List<SimpleGrantedAuthority> authorities = ((List<LinkedHashMap>) claims.get("authorities")).stream()
                            .map(a -> new SimpleGrantedAuthority((String) a.get("authority")))
                            .toList();

                    Authentication authentication = new UsernamePasswordAuthenticationToken(claims.getSubject(), "", authorities);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (JwtAuthenticationException e) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", e.getHttpStatus().getReasonPhrase());
                error.put("status", e.getHttpStatus().value());
                error.put("message", e.getMessage());
                httpServletResponse.setContentType("application/json");
                httpServletResponse.setStatus(e.getHttpStatus().value());

                mapper.writeValue(httpServletResponse.getWriter(), error);
            }
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
