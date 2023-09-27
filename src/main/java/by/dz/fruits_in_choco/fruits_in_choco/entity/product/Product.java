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
@Entity(name = "Product")
@Table(name = "product")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = Product.class)
public class Product implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private float price;

    private String imageURL;

    private int avgRating;

    @SuppressWarnings("JpaAttributeTypeInspection")
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

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "product", cascade = CascadeType.ALL)
    @JsonManagedReference
    List<ProductRating> ratings;

    public void calcAverageRating() {
        int sum = 0;
        for (ProductRating rating : this.ratings) {
            sum += rating.getRating();
        }
        this.avgRating = this.ratings.size() > 0 ? Math.round(sum / this.ratings.size()) : 0;
    }

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
                ", avgRating=" + avgRating +
                '}';
    }
}
