package by.dz.fruits_in_choco.fruits_in_choco.exception.handler;

import by.dz.fruits_in_choco.fruits_in_choco.dto.ApiError;
import by.dz.fruits_in_choco.fruits_in_choco.exception.JwtAuthenticationException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static by.dz.fruits_in_choco.fruits_in_choco.exception.ExceptionCode.JWT_TOKEN_INVALID;
import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Component
@Slf4j
public class JwtTokenFilterExceptionHandler {
    private final ObjectMapper objectMapper;

    public JwtTokenFilterExceptionHandler(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public void handleException(JwtAuthenticationException exception, HttpServletResponse response) {
        log.error(exception.getMessage());

        response.setContentType(APPLICATION_JSON_VALUE);
        response.setStatus(SC_UNAUTHORIZED);

        ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED, JWT_TOKEN_INVALID, exception.getMessage());

        try {
            objectMapper.writeValue(response.getWriter(), apiError);
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }
}
