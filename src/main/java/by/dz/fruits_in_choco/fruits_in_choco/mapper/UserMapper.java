package by.dz.fruits_in_choco.fruits_in_choco.mapper;

import by.dz.fruits_in_choco.fruits_in_choco.dto.RegistrationRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.user.UserRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.user.UserResponse;
import by.dz.fruits_in_choco.fruits_in_choco.entity.User;
import by.dz.fruits_in_choco.fruits_in_choco.service.RegistrationService;
import by.dz.fruits_in_choco.fruits_in_choco.service.UserService;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.UserServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component
public class UserMapper {
    private final ModelMapper modelMapper;
    private final UserService userService;
    private final RegistrationService registrationService;

    public UserMapper(ModelMapper modelMapper, UserServiceImpl userService, RegistrationService registrationService) {
        this.modelMapper = modelMapper;
        this.userService = userService;
        this.registrationService = registrationService;
    }

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
