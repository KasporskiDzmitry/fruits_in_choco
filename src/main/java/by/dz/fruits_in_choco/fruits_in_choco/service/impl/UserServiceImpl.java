package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.entity.User;
import by.dz.fruits_in_choco.fruits_in_choco.repository.UserRepository;
import by.dz.fruits_in_choco.fruits_in_choco.security.JwtTokenProvider;
import by.dz.fruits_in_choco.fruits_in_choco.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUser(String email) {
        return userRepository.findByEmail(email);
    }
}
