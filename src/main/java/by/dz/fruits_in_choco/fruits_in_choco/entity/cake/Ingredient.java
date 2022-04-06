package by.dz.fruits_in_choco.fruits_in_choco.entity.cake;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "ingredient")
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double price;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "status", columnDefinition = "ENUM('ACTIVE', 'DELETED')", nullable = false)
    private CakeIngredientStatus status;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "type", columnDefinition = "ENUM('FILLING', 'BISCUIT', 'DECORATION'", nullable = false)
    private CakeIngredientType type;
}
