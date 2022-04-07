package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.entity.user.Role;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.Status;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;
import by.dz.fruits_in_choco.fruits_in_choco.event.OnRegistrationCompleteEvent;
import by.dz.fruits_in_choco.fruits_in_choco.exception.UserNotConfirmedException;
import by.dz.fruits_in_choco.fruits_in_choco.repository.UserRepository;
import by.dz.fruits_in_choco.fruits_in_choco.security.JwtTokenProvider;
import by.dz.fruits_in_choco.fruits_in_choco.service.RegistrationService;
import by.dz.fruits_in_choco.fruits_in_choco.util.EmailValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

@RequiredArgsConstructor
@Service("registrationService")
public class RegistrationServiceImpl implements RegistrationService {
    private final EmailValidator emailValidator;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final ApplicationEventPublisher eventPublisher;

    @Value("${jwt.activationAccount}")
    private Long validity;

    @Override
    public String register(User user, HttpServletRequest request) {
        boolean isValidEmail = emailValidator.
                test(user.getEmail());

        if (!isValidEmail) {
            throw new IllegalStateException("email not valid");
        }

        User userDAO = userRepository.findByEmail(user.getEmail());

        if (userDAO == null) {
            String encodedPassword = passwordEncoder
                    .encode(user.getPassword());
            user.setPassword(encodedPassword);
            user.setRole(Role.USER);
            user.setStatus(Status.NOT_CONFIRMED);
            user.setActivationToken(tokenProvider.createActivationAccountToken(UUID.randomUUID().toString(), validity));

            String appUrl = request.getContextPath();
            eventPublisher.publishEvent(new OnRegistrationCompleteEvent(user, appUrl));

            userRepository.save(user);
        } else {
            throw new IllegalStateException("email already taken");
        }

        return "user successfully registered";
    }

    @Override
    public String confirmRegistration(String token) {
        User user = userRepository.findByActivationToken(token);

        if (user != null) {
            user.setActivationToken(null);
            user.setStatus(Status.ACTIVE);
            userRepository.save(user);
        } else {
            throw new UserNotConfirmedException("Unknown token");
        }

        return "Registration complete!";
    }
}
