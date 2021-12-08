package by.dz.fruits_in_choco.fruits_in_choco.dto;

import lombok.Data;

import java.util.List;

@Data
public class CategoryResponse {
    private Long id;
    private String name;
    private String description;
    private String imageURL;
    private List<ProductTypeResponse> types;
}
