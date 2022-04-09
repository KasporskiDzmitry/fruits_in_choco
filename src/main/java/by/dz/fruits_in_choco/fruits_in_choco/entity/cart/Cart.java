package by.dz.fruits_in_choco.fruits_in_choco.entity.cart;

import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int quantity;

    private double price;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<CartItem> cartItems;

    @OneToOne(mappedBy = "cart")
    @JsonBackReference
    private User user;

    @Override
    public String toString() {
        return "Cart{" +
                "id=" + id +
                ", quantity='" + quantity + '\'' +
                ", price=" + price +
                ", cartItems=" + cartItems +
                ", userId=" + user.getId() +
                '}';
    }
}
