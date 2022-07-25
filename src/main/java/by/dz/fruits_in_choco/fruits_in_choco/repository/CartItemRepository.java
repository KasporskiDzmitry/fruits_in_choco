package by.dz.fruits_in_choco.fruits_in_choco.repository;

import by.dz.fruits_in_choco.fruits_in_choco.entity.cart.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
