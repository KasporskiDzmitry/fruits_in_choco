package by.dz.fruits_in_choco.fruits_in_choco.entity.product;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="products")
public class Product {
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
}
