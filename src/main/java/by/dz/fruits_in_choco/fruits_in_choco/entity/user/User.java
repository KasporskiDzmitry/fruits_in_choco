package by.dz.fruits_in_choco.fruits_in_choco.entity.user;

import by.dz.fruits_in_choco.fruits_in_choco.entity.cart.Cart;
import by.dz.fruits_in_choco.fruits_in_choco.entity.order.Order;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.ProductRating;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private short id;

    private String email;

    private String password;

    @Column(name = "firstname")
    private String firstName;

    @Column(name = "lastname")
    private String lastName;

    @Column(name = "status", columnDefinition = "ENUM('ACTIVE', 'BANNED', 'NOT_CONFIRMED')")
    @Enumerated(value = EnumType.STRING)
    private Status status;

    @Column(name = "role", columnDefinition = "ENUM('ADMIN', 'USER')")
    @Enumerated(value = EnumType.STRING)
    private Role role;

    @Column(name = "activationtoken")
    private String activationToken;

    @OneToMany(cascade = CascadeType.ALL)
    private List<ProductRating> ratings;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Order> orders;

    @OneToOne
    @JoinColumn(name = "cart_id", referencedColumnName = "id")
    @JsonManagedReference
    private Cart cart;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", status=" + status +
                ", role=" + role +
                ", activationToken='" + activationToken + '\'' +
                ", ratings=" + ratings +
                ", orders=" + orders +
                ", cartId=" + cart.getId() +
                '}';
    }
}
