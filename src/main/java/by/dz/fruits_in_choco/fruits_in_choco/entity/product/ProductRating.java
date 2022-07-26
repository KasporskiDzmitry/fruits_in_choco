package by.dz.fruits_in_choco.fruits_in_choco.entity.product;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "rating")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class ProductRating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    private String author;

    @Column(name = "author_id")
    private Long authorId;

    private int rating;

    private String message;

    private Date date;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(columnDefinition = "BIT")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean approved;

    @Override
    public String toString() {
        return "ProductRating{" +
                "id=" + id +
                ", author=" + author + '\'' +
                ", authorId=" + authorId + '\'' +
                ", rating=" + rating +
                ", message='" + message + '\'' +
                ", date=" + date +
                ", productId=" + product.getId() +
                ", approved=" + approved +
                '}';
    }
}
