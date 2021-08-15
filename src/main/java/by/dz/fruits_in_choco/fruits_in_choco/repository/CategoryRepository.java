package by.dz.fruits_in_choco.fruits_in_choco.repository;

import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    List<Category> findAll();
}
