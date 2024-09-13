package by.dz.fruits_in_choco.fruits_in_choco.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity(name = "Slide")
@Table(name = "slide")
public class Slide {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String text;

    private String href;

    @Column(name = "image_url")
    private String imageURL;
}