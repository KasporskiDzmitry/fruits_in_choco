package by.dz.fruits_in_choco.fruits_in_choco.entity;

import lombok.Data;

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

    private int rating;

    private String message;

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
