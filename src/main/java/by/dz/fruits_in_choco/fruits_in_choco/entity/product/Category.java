package by.dz.fruits_in_choco.fruits_in_choco.entity.product;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @Column(name = "imageURL")
    private String imageURL;
    @OneToMany (mappedBy="category", fetch=FetchType.EAGER)
    @JsonManagedReference
    @ToString.Exclude
    private List<ProductType> types;
}
