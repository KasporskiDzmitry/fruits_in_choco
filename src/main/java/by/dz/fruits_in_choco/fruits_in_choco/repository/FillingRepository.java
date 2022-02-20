package by.dz.fruits_in_choco.fruits_in_choco.repository;

import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Biscuit;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.CakeIngredientStatus;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Filling;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FillingRepository extends JpaRepository<Filling, Long> {
    List<Filling> findByStatus(CakeIngredientStatus status);

}
