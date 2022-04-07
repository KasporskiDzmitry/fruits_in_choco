package by.dz.fruits_in_choco.fruits_in_choco.entity.product;

import lombok.Data;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "rating")
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

    @Column(columnDefinition = "TINYINT")
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
                ", approved=" + approved +
                '}';
    }
}
