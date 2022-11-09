package by.dz.fruits_in_choco.fruits_in_choco.mapper;

import by.dz.fruits_in_choco.fruits_in_choco.dto.RegistrationRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.product.ProductRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.user.UserRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.user.UserResponse;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;
import by.dz.fruits_in_choco.fruits_in_choco.service.ProfileService;
import by.dz.fruits_in_choco.fruits_in_choco.service.RegistrationService;
import by.dz.fruits_in_choco.fruits_in_choco.service.UserService;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.UserServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.stream.Collectors;

@Component
public class UserMapper {
    private final ModelMapper modelMapper;
    private final UserService userService;
    private final ProfileService profileService;
    private final RegistrationService registrationService;
    private final ProductMapper productMapper;

    public UserMapper(ModelMapper modelMapper, UserServiceImpl userService, ProfileService profileService, RegistrationService registrationService, ProductMapper productMapper) {
        this.modelMapper = modelMapper;
        this.userService = userService;
        this.profileService = profileService;
        this.registrationService = registrationService;
        this.productMapper = productMapper;
    }

    private User convertToEntity(UserRequest userRequest) {
        return modelMapper.map(userRequest, User.class);
    }

    private User convertToEntity(RegistrationRequest registrationRequest) {
        return modelMapper.map(registrationRequest, User.class);
    }

    private UserResponse mapToResponseDTO(User user) {
        modelMapper.typeMap(User.class, UserResponse.class).addMappings(mapper -> {
            mapper.map(src -> user.getRatings().stream().map(productMapper::mapToResponseDTO).collect(Collectors.toList()), UserResponse::setRatings);
        });
        return modelMapper.map(user, UserResponse.class);
    }

    public UserResponse getProfile(String email) {
        return mapToResponseDTO(userService.getUserByEmail(email));
    }

    public UserResponse getUserById(Short id) {
        return mapToResponseDTO(userService.getUserById(id));
    }

    public UserResponse updateProfile(UserRequest userRequest) {
        return mapToResponseDTO(profileService.updateProfile(convertToEntity(userRequest)));
    }

    public Product addToCart(ProductRequest request, String email) {
        return profileService.addToCart(productMapper.mapToEntity(request), request.getQuantity(), email);
    }

    public String register(RegistrationRequest registrationRequest, HttpServletRequest request) {
        return registrationService.register(convertToEntity(registrationRequest), request);
    }

    public String confirmRegistration(String token) {
        return registrationService.confirmRegistration(token);
    }
}
