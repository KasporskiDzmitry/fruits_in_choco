package by.dz.fruits_in_choco.fruits_in_choco.entity.product;

import by.dz.fruits_in_choco.fruits_in_choco.entity.category.Category;
import by.dz.fruits_in_choco.fruits_in_choco.util.HashMapConverter;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Data
@Entity
@Table(name = "product")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = Product.class)
public class Product implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Short id;

    private String name;

    private String description;

    private float price;

    private String imageURL;

    @Column(name = "attributes", columnDefinition = "json")
    @Convert(converter = HashMapConverter.class)
    private Map<String, Object> attributes;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "status", columnDefinition = "ENUM('ACTIVE', 'DELETED', 'NOT_CONFIRMED')", nullable = false)
    private ProductStatus status;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product", cascade = CascadeType.ALL)
    @JsonManagedReference
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
                ", attributes=" + attributes +
                '}';
    }
}
