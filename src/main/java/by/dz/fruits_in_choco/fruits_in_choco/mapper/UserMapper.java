package by.dz.fruits_in_choco.fruits_in_choco.mapper;

import by.dz.fruits_in_choco.fruits_in_choco.dto.RegistrationRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.UserRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.UserResponse;
import by.dz.fruits_in_choco.fruits_in_choco.entity.User;
import by.dz.fruits_in_choco.fruits_in_choco.service.RegistrationService;
import by.dz.fruits_in_choco.fruits_in_choco.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component
@RequiredArgsConstructor
public class UserMapper {
    private final ModelMapper modelMapper;
    private final UserService userService;
    private final RegistrationService registrationService;

    private User convertToEntity(UserRequest userRequest) {
        return modelMapper.map(userRequest, User.class);
    }

    private User convertToEntity(RegistrationRequest registrationRequest) {
        return modelMapper.map(registrationRequest, User.class);
    }

    private UserResponse convertToResponseDto(User user) {
        return modelMapper.map(user, UserResponse.class);
    }

    public UserResponse getProfile(String email) {
        return convertToResponseDto(userService.getUserByEmail(email));
    }

    public UserResponse updateProfile(UserRequest userRequest) {
        return convertToResponseDto(userService.updateProfile(convertToEntity(userRequest)));
    }

    public String register(RegistrationRequest registrationRequest, HttpServletRequest request) {
        return registrationService.register(convertToEntity(registrationRequest), request);
    }

    public String confirmRegistration(String token) {
        return registrationService.confirmRegistration(token);
    }
}
