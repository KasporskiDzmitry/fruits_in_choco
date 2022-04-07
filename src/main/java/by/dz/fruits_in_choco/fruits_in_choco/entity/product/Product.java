package by.dz.fruits_in_choco.fruits_in_choco.entity.product;

import by.dz.fruits_in_choco.fruits_in_choco.entity.category.Category;
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

    private String imageURL;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "status", columnDefinition = "ENUM('ACTIVE', 'DELETED', 'NOT_CONFIRMED')", nullable = false)
    private ProductStatus status;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(cascade = CascadeType.ALL)
    List<ProductRating> ratings;

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", imageURL=" + imageURL +
                ", categoryId=" + category.getId() +
                ", ratings=" + ratings +
                ", status=" + status +
                '}';
    }
}
