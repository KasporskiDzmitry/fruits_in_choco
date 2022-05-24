package by.dz.fruits_in_choco.fruits_in_choco.repository;

import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.CakeIngredientStatus;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
    List<Ingredient> findByStatus(CakeIngredientStatus status);
}
