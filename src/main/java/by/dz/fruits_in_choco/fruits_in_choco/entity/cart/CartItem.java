package by.dz.fruits_in_choco.fruits_in_choco.entity.cart;

import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "cart_item")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int quantity;

    @OneToOne
    private Product product;
}
