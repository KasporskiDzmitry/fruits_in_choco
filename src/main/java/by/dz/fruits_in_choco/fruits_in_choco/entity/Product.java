package by.dz.fruits_in_choco.fruits_in_choco.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@Entity
@Table(name="product")
public class Product implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private int price;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "type_id")
    private ProductType type;

    @OneToMany
    List<ProductRating> ratings;

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", typeId=" + type.getId() +
                ", ratings=" + ratings +
                '}';
    }
}
