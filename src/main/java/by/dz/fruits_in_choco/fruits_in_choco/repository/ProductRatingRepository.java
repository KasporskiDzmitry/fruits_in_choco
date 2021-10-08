package by.dz.fruits_in_choco.fruits_in_choco.repository;

import by.dz.fruits_in_choco.fruits_in_choco.entity.ProductRating;
import by.dz.fruits_in_choco.fruits_in_choco.entity.ProductRatingKey;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductRatingRepository extends JpaRepository<ProductRating, Long> {
}
