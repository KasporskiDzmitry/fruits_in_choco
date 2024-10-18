package by.dz.fruits_in_choco.fruits_in_choco.util;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import static by.dz.fruits_in_choco.fruits_in_choco.util.Constants.REFRESH_TOKEN_COOKIE;

@Component
public class CookieHelper {
    public static String getCookieValue(HttpServletRequest request, String cookieName) {
        String value = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(cookieName)) {
                    value = cookie.getValue();
                }
            }
        }
        return value;
    }

    public String createRefreshTokenCookie(String value, int maxAge) {
        return (ResponseCookie
                .from(REFRESH_TOKEN_COOKIE, value)
                .secure(true)
                .httpOnly(true)
                .path("/api/v1/auth/refresh-token")
                .maxAge(Math.toIntExact(maxAge))
                .sameSite("Strict")
                .build()).toString();
    }
}
