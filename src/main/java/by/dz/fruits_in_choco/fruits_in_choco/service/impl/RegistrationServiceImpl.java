package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.entity.Role;
import by.dz.fruits_in_choco.fruits_in_choco.entity.Status;
import by.dz.fruits_in_choco.fruits_in_choco.entity.User;
import by.dz.fruits_in_choco.fruits_in_choco.repository.UserRepository;
import by.dz.fruits_in_choco.fruits_in_choco.service.RegistrationService;
import by.dz.fruits_in_choco.fruits_in_choco.util.EmailValidator;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service("registrationService")
public class RegistrationServiceImpl implements RegistrationService {
    private final EmailValidator emailValidator;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public String register(User user) {
        boolean isValidEmail = emailValidator.
                test(user.getEmail());

        if (!isValidEmail) {
            throw new IllegalStateException("email not valid");
        }

        User userDAO = userRepository.findByEmail(user.getEmail());

        if (userDAO == null) {
            String encodedPassword = bCryptPasswordEncoder
                    .encode(user.getPassword());
            user.setPassword(encodedPassword);
            user.setRole(Role.USER);
            user.setStatus(Status.ACTIVE);

            userRepository.save(user);
        } else {
            throw new IllegalStateException("email already taken");
        }

        return "user successfully registered";
    }
}
