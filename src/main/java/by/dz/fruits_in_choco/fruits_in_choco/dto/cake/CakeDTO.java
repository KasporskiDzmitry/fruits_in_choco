package by.dz.fruits_in_choco.fruits_in_choco.dto.cake;

import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Biscuit;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Decoration;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Filling;
import lombok.Data;

import java.util.List;

@Data
public class CakeDTO {

    private double weight;
    private Biscuit biscuit;
    private List<Filling> fillings;
    private List<Decoration> decorations;
}
