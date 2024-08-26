package by.dz.fruits_in_choco.fruits_in_choco.util;

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

    public Cookie createRefreshTokenCookie(String value, int maxAge) {
        Cookie cookie = new Cookie(REFRESH_TOKEN_COOKIE, value);
        cookie.setMaxAge(Math.toIntExact(maxAge));
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setPath("/api/v1/auth/refresh-token");
        return cookie;
    }
}
