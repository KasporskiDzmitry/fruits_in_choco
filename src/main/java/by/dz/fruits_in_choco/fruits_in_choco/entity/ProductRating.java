package by.dz.fruits_in_choco.fruits_in_choco.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "rating")
public class ProductRating {
//    @EmbeddedId
//    ProductRatingKey id;
//
//    @ManyToOne
//    @MapsId("user_id")
//    @JoinColumn(name = "user_id")
//    @JsonIgnore
//    User user;
//
//    @ManyToOne
//    @MapsId("product_id")
//    @JoinColumn(name = "product_id")
//    @JsonIgnore
//    Product product;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "author")
    private String author;

    @Column(name = "rating")
    private int rating;

    @Column(name = "message")
    private String message;

    @Column(name = "date")
    private Date date;

    @Override
    public String toString() {
        return "ProductRating{" +
                "id=" + id +
                ", author='" + author + '\'' +
                ", rating=" + rating +
                ", message='" + message + '\'' +
                ", date=" + date +
                '}';
    }
}
