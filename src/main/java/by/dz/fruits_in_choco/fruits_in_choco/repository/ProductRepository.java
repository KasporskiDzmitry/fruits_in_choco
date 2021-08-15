package by.dz.fruits_in_choco.fruits_in_choco.repository;

import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.productReview.ProductReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    Product findById(int id);

    List<Product> findAll();

    List<Product> findByProductType_IdIn(List<Integer> types);

}
