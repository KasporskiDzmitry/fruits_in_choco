package by.dz.fruits_in_choco.fruits_in_choco.entity.cake;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "cake")
public class Cake {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Short id;

    private String name;

    private float price;

    private float weight;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "ENUM('CONFIRMED', 'NOT_CONFIRMED')", nullable = false)
    private CakeStatus status;

    @ManyToMany
    private List<Ingredient> ingredients;
}
