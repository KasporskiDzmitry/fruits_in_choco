package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Cake;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Ingredient;

import java.util.List;

public interface CakeService {
    List<Cake> getAllCakes();
    List<Ingredient> getConstructorData();
    Cake saveCake(Cake cake);
    void deleteCake(Long id);
    Cake updateCake(Cake cake, Long id);
    Ingredient updateIngredient(Ingredient newIngredient, Long id);
    void deleteIngredient(Long id);
    Ingredient createIngredient(Ingredient ingredient);
}
