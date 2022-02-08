package by.dz.fruits_in_choco.fruits_in_choco.entity;

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

    @Enumerated(value = EnumType.STRING)
    private Status status;

    @Enumerated(value = EnumType.STRING)
    private Role role;

    @Column(name = "activationtoken")
    private String activationToken;

    @OneToMany(cascade = CascadeType.ALL)
    private List<ProductRating> ratings;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Order> orders;
}
