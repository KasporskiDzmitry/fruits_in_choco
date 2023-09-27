package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.entity.cart.Cart;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.*;
import by.dz.fruits_in_choco.fruits_in_choco.event.OnRegistrationCompleteEvent;
import by.dz.fruits_in_choco.fruits_in_choco.exception.UserNotConfirmedException;
import by.dz.fruits_in_choco.fruits_in_choco.repository.CartRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.UserRepository;
import by.dz.fruits_in_choco.fruits_in_choco.security.JwtTokenProvider;
import by.dz.fruits_in_choco.fruits_in_choco.service.RegistrationService;
import by.dz.fruits_in_choco.fruits_in_choco.service.TokenService;
import by.dz.fruits_in_choco.fruits_in_choco.util.EmailValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service("registrationService")
public class RegistrationServiceImpl implements RegistrationService {
    private final EmailValidator emailValidator;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final ApplicationEventPublisher eventPublisher;
    private final CartRepository cartRepository;
    private final TokenService tokenService;

    @Value("${jwt.activationAccount}")
    private Long validity;

    @Override
    public String register(User user, HttpServletRequest request) {
        if (!emailValidator.test(user.getEmail())) {
            throw new IllegalStateException("email not valid");
        }

        User userDAO = userRepository.findByEmail(user.getEmail()).orElse(null);

        if (userDAO == null) {
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encodedPassword);
            user.setRole(Role.USER);
            user.setStatus(Status.NOT_CONFIRMED);
            user.setActivationToken(tokenProvider.createActivationAccountToken(UUID.randomUUID().toString(), validity));
            user.setCart(cartRepository.save(new Cart()));

            userRepository.save(user);

            String appUrl = request.getContextPath();
            eventPublisher.publishEvent(new OnRegistrationCompleteEvent(user, appUrl));
        } else {
            throw new IllegalStateException("email already taken");
        }

        return "user successfully registered";
    }

    @Override
    @Transactional
    public String confirmRegistration(String token) {
        User user = userRepository.findByActivationToken(token);

        if (user != null) {
            user.setActivationToken(null);
            user.setStatus(Status.ACTIVE);

            List<Token> tokens = user.getTokens();
            tokens.add(tokenService.createToken(user, TokenType.ACCESS));
            tokens.add(tokenService.createToken(user, TokenType.REFRESH));
        } else {
            throw new UserNotConfirmedException("Unknown token");
        }

        return "Registration complete!";
    }
}
