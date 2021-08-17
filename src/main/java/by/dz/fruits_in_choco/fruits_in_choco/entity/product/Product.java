package by.dz.fruits_in_choco.fruits_in_choco.entity.product;

import by.dz.fruits_in_choco.fruits_in_choco.entity.productReview.ProductReview;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@Entity
@Table(name="product")
public class Product implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @Column(name = "price")
    private int price;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "type_id")
    private ProductType productType;

    @OneToMany
    private List<ProductReview> reviews;
}
