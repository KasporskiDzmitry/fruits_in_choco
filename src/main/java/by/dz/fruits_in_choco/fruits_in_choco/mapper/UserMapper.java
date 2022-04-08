package by.dz.fruits_in_choco.fruits_in_choco.mapper;

import by.dz.fruits_in_choco.fruits_in_choco.dto.RegistrationRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.product.ProductRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.user.UserRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.user.UserResponse;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;
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
    private final ProductMapper productMapper;

    public UserMapper(ModelMapper modelMapper, UserServiceImpl userService, RegistrationService registrationService, ProductMapper productMapper) {
        this.modelMapper = modelMapper;
        this.userService = userService;
        this.registrationService = registrationService;
        this.productMapper = productMapper;
    }

    private User convertToEntity(UserRequest userRequest) {
        return modelMapper.map(userRequest, User.class);
    }

    private User convertToEntity(RegistrationRequest registrationRequest) {
        return modelMapper.map(registrationRequest, User.class);
    }

    private UserResponse mapToResponseDto(User user) {
        modelMapper.typeMap(User.class, UserResponse.class).addMappings(mapper -> {
            mapper.map(User::getProducts, UserResponse::setCart);
        });
        return modelMapper.map(user, UserResponse.class);
    }

    public UserResponse getProfile(String email) {
        return mapToResponseDto(userService.getUserByEmail(email));
    }

    public UserResponse updateProfile(UserRequest userRequest) {
        return mapToResponseDto(userService.updateProfile(convertToEntity(userRequest)));
    }

    public Product addToCart(ProductRequest request, String email) {
        return userService.addToCart(productMapper.mapToEntity(request), email);
    }

    public String register(RegistrationRequest registrationRequest, HttpServletRequest request) {
        return registrationService.register(convertToEntity(registrationRequest), request);
    }

    public String confirmRegistration(String token) {
        return registrationService.confirmRegistration(token);
    }
}
