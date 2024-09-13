package by.dz.fruits_in_choco.fruits_in_choco.security;

import by.dz.fruits_in_choco.fruits_in_choco.exception.JwtAuthenticationException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenFilterExceptionHandler {
    private final ObjectMapper objectMapper;

    public JwtTokenFilterExceptionHandler(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public void handleException(JwtAuthenticationException e, HttpServletResponse response) {
        Map<String, Object> error = new HashMap<>();
        error.put("error", e.getHttpStatus().getReasonPhrase());
        error.put("status", e.getHttpStatus().value());
        error.put("message", e.getMessage());
        response.setContentType("application/json");
        response.setStatus(e.getHttpStatus().value());

        try {
            objectMapper.writeValue(response.getWriter(), error);
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }
}
