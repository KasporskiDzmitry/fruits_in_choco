package by.dz.fruits_in_choco.fruits_in_choco.repository;

import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Biscuit;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.CakeIngredientStatus;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Decoration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DecorationRepository extends JpaRepository<Decoration, Long> {
    List<Decoration> findByStatus(CakeIngredientStatus status);

}
