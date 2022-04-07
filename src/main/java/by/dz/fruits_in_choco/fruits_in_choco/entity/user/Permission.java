package by.dz.fruits_in_choco.fruits_in_choco.entity.user;

public enum Permission {
    USER("USER"),
    ADMIN("ADMIN");

    private final String permission;

    Permission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return this.permission;
    }
}
