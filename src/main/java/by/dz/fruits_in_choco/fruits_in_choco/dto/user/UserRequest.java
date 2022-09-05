package by.dz.fruits_in_choco.fruits_in_choco.dto.user;

import by.dz.fruits_in_choco.fruits_in_choco.entity.product.ProductRating;
import lombok.Data;

import java.util.List;

@Data
public class UserRequest {
    private Short id;
    private String firstName;
    private String lastName;
    private String email;
    private List<ProductRating> ratings;
}
