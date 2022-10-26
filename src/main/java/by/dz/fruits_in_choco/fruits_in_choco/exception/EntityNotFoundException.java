package by.dz.fruits_in_choco.fruits_in_choco.exception;

public class EntityNotFoundException extends RuntimeException{
    public EntityNotFoundException(String msg) {
        super(msg);
    }
    public EntityNotFoundException(String className, Short id) {super(className + " with id " + id + " not found");}
    public EntityNotFoundException(String msg, Throwable cause) {
        super(msg, cause);
    }
}
