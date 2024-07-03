package by.dz.fruits_in_choco.fruits_in_choco.entity.category;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity(name = "Category")
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private String imageURL;
}
