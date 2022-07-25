package by.dz.fruits_in_choco.fruits_in_choco.dto.cake;

import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Ingredient;
import lombok.Data;

import java.util.List;

@Data
public class CakeDTO {
    private double weight;
    private List<Ingredient> ingredients;
}
