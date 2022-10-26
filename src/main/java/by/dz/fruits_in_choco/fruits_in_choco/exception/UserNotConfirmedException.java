package by.dz.fruits_in_choco.fruits_in_choco.exception;

import lombok.Getter;

@Getter
public class UserNotConfirmedException extends RuntimeException {
    public UserNotConfirmedException(String msg) {
        super(msg);
    }

    public UserNotConfirmedException(String msg, Throwable cause) {
        super(msg, cause);
    }
}
