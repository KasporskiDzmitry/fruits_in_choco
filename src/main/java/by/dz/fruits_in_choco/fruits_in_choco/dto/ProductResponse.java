package by.dz.fruits_in_choco.fruits_in_choco.dto;

import lombok.Data;

@Data
public class ProductResponse {
    private Long id;
    private String name;
    private String description;
    private int price;
    private Long typeId;
}
