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
    private Long id;

    private String name;

    private double price;

    private double weight;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "ENUM('CONFIRMED', 'NOT_CONFIRMED')", nullable = false)
    private CakeStatus status;

    @OneToMany
    private List<Filling> fillings;

    @OneToMany
    private List<Decoration> decorations;

    @OneToOne
    @JoinColumn(name = "biscuit_id", referencedColumnName = "id")
    private Biscuit biscuit;
}
