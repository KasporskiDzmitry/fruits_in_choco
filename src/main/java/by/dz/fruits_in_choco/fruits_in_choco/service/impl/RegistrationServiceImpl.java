package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.entity.Role;
import by.dz.fruits_in_choco.fruits_in_choco.entity.Status;
import by.dz.fruits_in_choco.fruits_in_choco.entity.User;
import by.dz.fruits_in_choco.fruits_in_choco.event.OnRegistrationCompleteEvent;
import by.dz.fruits_in_choco.fruits_in_choco.exception.UserNotConfirmedException;
import by.dz.fruits_in_choco.fruits_in_choco.repository.UserRepository;
import by.dz.fruits_in_choco.fruits_in_choco.security.JwtTokenProvider;
import by.dz.fruits_in_choco.fruits_in_choco.service.RegistrationService;
import by.dz.fruits_in_choco.fruits_in_choco.util.EmailValidator;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

@AllArgsConstructor
@Service("registrationService")
public class RegistrationServiceImpl implements RegistrationService {
    private final EmailValidator emailValidator;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final ApplicationEventPublisher eventPublisher;

    @Override
    public String register(User user, HttpServletRequest request) {
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
            user.setStatus(Status.NOT_CONFIRMED);
            user.setActivationToken(tokenProvider.createActivationAccountToken(UUID.randomUUID().toString(), 10000L));

            String appUrl = request.getContextPath();
            eventPublisher.publishEvent(new OnRegistrationCompleteEvent(user,
                    request.getLocale(), appUrl));

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
            throw new UserNotConfirmedException("Unknown token", HttpStatus.NOT_FOUND);
        }

        return "Registration complete!";
    }
}
