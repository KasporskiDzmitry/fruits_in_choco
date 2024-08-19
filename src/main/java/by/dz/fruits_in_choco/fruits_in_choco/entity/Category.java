package by.dz.fruits_in_choco.fruits_in_choco.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity(name = "Category")
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    @Column(name = "main_image_url")
    private String mainImageURL;

    @OneToMany(mappedBy = "category")
    @JsonManagedReference
    private List<Filling> fillings;

    @OneToMany(mappedBy = "category")
    @JsonManagedReference
    private List<Decor> decors;
}
