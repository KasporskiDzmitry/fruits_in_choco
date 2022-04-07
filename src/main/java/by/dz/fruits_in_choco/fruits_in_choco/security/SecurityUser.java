package by.dz.fruits_in_choco.fruits_in_choco.security;

import by.dz.fruits_in_choco.fruits_in_choco.entity.user.Status;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class SecurityUser implements UserDetails {

    private final String username;
    private final String password;
    private final List<SimpleGrantedAuthority> authorities;
    private final boolean isActive;

    public SecurityUser(String username, String password, List<SimpleGrantedAuthority> authorities, boolean isActive) {
        this.username = username;
        this.password = password;
        this.authorities = authorities;
        this.isActive = isActive;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

    public static UserDetails fromUser(User user) {
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(), user.getPassword(),
                !user.getStatus().equals(Status.BANNED),
                user.getStatus().equals(Status.ACTIVE) || user.getStatus().equals(Status.NOT_CONFIRMED),
                user.getStatus().equals(Status.ACTIVE) || user.getStatus().equals(Status.NOT_CONFIRMED),
                user.getStatus().equals(Status.ACTIVE) || user.getStatus().equals(Status.NOT_CONFIRMED),
                user.getRole().getAuthorities()
        );
    }
}
