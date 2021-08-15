package by.dz.fruits_in_choco.fruits_in_choco.entity;

import by.dz.fruits_in_choco.fruits_in_choco.entity.productReview.ProductReview;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "firstname")
    private String firstName;
    @Column(name = "lastname")
    private String lastName;
    @Enumerated(value = EnumType.STRING)
    @Column(name = "status")
    private Status status;
    @Enumerated(value = EnumType.STRING)
    @Column(name = "role")
    private Role role;


    @OneToMany (mappedBy="user", fetch=FetchType.EAGER)
    @JsonManagedReference
    @ToString.Exclude
    private List<ProductReview> reviews;
}
