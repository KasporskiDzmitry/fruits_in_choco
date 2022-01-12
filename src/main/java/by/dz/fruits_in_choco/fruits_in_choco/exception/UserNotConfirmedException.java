package by.dz.fruits_in_choco.fruits_in_choco.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class UserNotConfirmedException extends RuntimeException {
    private final String accountConfirmationError;

    public UserNotConfirmedException(String accountConfirmationError, HttpStatus httpStatus) {
        this.accountConfirmationError = accountConfirmationError;
    }
}
