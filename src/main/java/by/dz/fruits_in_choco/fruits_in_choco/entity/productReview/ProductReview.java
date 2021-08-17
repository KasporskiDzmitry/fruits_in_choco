package by.dz.fruits_in_choco.fruits_in_choco.entity.productReview;

import by.dz.fruits_in_choco.fruits_in_choco.entity.User;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.ProductType;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "review")
public class ProductReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "reviewer")
    private String reviewer;
    @Column(name = "text")
    private String text;
    @Column(name = "stars")
    private int stars;
    @Column(name = "date")
    private Date datetime;
}
