package by.dz.fruits_in_choco.fruits_in_choco.dto.category;

import lombok.Data;
import java.util.List;

@Data
public class CategoryRequest {
    private String name;
    private String description;
    private String imageURL;
    private List<String> products;
}
