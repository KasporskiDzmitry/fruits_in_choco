package by.dz.fruits_in_choco.fruits_in_choco.repository;

import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Biscuit;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.CakeIngredientStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BiscuitRepository extends JpaRepository<Biscuit, Long> {
    List<Biscuit> findByStatus(CakeIngredientStatus status);
}
