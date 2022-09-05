package by.dz.fruits_in_choco.fruits_in_choco.entity.slide;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "slide")
public class Slide {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Short id;

    private String title;

    private String text;

    private String href;

    private String imageURL;
}
