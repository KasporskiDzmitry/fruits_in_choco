package by.dz.fruits_in_choco.fruits_in_choco.exception;

import lombok.Getter;

@Getter
public class ProductDeletedException extends RuntimeException {
    public ProductDeletedException(String msg) {
        super(msg);
    }
}
