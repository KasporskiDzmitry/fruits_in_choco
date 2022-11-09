package by.dz.fruits_in_choco.fruits_in_choco.entity.order;

import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "order_item")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Short id;

    private Short quantity;

    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
