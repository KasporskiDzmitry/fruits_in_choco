package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Cake;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Ingredient;

import java.util.List;

public interface CakeService {
    List<Cake> getAllCakes();
    List<Ingredient> getConstructorData();
    Cake saveCake(Cake cake);
    void deleteCake(Short id);
    Cake updateCake(Cake cake, Short id);
    Ingredient updateIngredient(Ingredient newIngredient, Short id);
    void deleteIngredient(Short id);
    Ingredient createIngredient(Ingredient ingredient);
}
