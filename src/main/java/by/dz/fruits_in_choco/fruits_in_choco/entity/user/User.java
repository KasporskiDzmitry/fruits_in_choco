package by.dz.fruits_in_choco.fruits_in_choco.entity.user;

import by.dz.fruits_in_choco.fruits_in_choco.entity.order.Order;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.ProductRating;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String password;

    @Column(name = "firstname")
    private String firstName;

    @Column(name = "lastname")
    private String lastName;

    @Column(name = "status", columnDefinition = "ENUM('ACTIVE', 'BANNED', 'NOT_CONFIRMED')", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private Status status;

    @Column(name = "role", columnDefinition = "ENUM('ADMIN', 'USER')", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private Role role;

    @Column(name = "activationtoken")
    private String activationToken;

    @OneToMany(cascade = CascadeType.ALL)
    private List<ProductRating> ratings;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Order> orders;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Product> products;
}
