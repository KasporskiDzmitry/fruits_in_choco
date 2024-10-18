package by.dz.fruits_in_choco.fruits_in_choco.exception.handler;

import by.dz.fruits_in_choco.fruits_in_choco.dto.ApiError;
import by.dz.fruits_in_choco.fruits_in_choco.exception.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

import static by.dz.fruits_in_choco.fruits_in_choco.exception.ExceptionCode.*;

@Slf4j
@RestControllerAdvice
public class ControllerAdvice {

    @ExceptionHandler({BadCredentialsException.class})
    public ResponseEntity<ApiError> handleBadCredentialsException(BadCredentialsException exception) {
        log.error(exception.getMessage());
        ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED, INVALID_CREDENTIALS, exception.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiError);
    }

    @ExceptionHandler({UsernameNotFoundException.class})
    public ResponseEntity<ApiError> handleUsernameNotFoundException(UsernameNotFoundException exception) {
        log.error(exception.getMessage());
        ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED, UNAUTHORIZED, exception.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiError);
    }

    @ExceptionHandler({DisabledException.class})
    public ResponseEntity<ApiError> handleDisabledException(Exception exception) {
        log.error(exception.getMessage());
        ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED, USER_STATUS_INACTIVE, exception.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiError);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<ApiError> handleValidationBadRequest(MethodArgumentNotValidException exception) {
        List<String> errors = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(this::formatFieldErrorMessage)
                .toList();

        String message = "Invalid request: " + String.join(", ", errors);
        log.error(message);

        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, VALIDATION_ERROR, message);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiError);
    }

    @ExceptionHandler({EntityNotFoundException.class})
    public ResponseEntity<ApiError> handleEntityNotFoundException(EntityNotFoundException exception) {
        log.error(exception.getMessage());
        ApiError apiError = new ApiError(HttpStatus.NOT_FOUND, ENTITY_NOT_FOUND, exception.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiError);
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<ApiError> handleUnknownException(Exception exception) {
        log.error(exception.getMessage());
        ApiError apiError = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, UNKNOWN_ERROR, "Please contact support");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiError);
    }

    private String formatFieldErrorMessage(FieldError fieldError) {
        return String.format("%s: %s (rejected value: %s)",
                fieldError.getField(),
                fieldError.getDefaultMessage(),
                fieldError.getRejectedValue());
    }
}
