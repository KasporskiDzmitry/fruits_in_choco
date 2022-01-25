package by.dz.fruits_in_choco.fruits_in_choco.dto.user;

import by.dz.fruits_in_choco.fruits_in_choco.entity.ProductRating;
import by.dz.fruits_in_choco.fruits_in_choco.entity.Role;
import lombok.Data;

import java.util.List;

@Data
public class UserResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Role role;
    private String status;
    private List<ProductRating> ratings;
}
