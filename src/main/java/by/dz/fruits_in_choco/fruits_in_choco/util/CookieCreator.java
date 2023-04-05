package by.dz.fruits_in_choco.fruits_in_choco.util;

import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;

@Component
public class CookieCreator {
    public Cookie createRefreshTokenCookie(String value, int maxAge) {
        Cookie cookie = new Cookie("refreshToken", value);
        cookie.setMaxAge(Math.toIntExact(maxAge));
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setPath("/api/v1/auth/refreshToken");
        return cookie;
    }
}
