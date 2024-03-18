package by.dz.fruits_in_choco.fruits_in_choco.dto.category;

import by.dz.fruits_in_choco.fruits_in_choco.entity.category.CategoryAttribute;

import java.util.List;

public record CategoryRequest(
        String name,
        String description,
        String imageURL,
        List<CategoryAttribute> attributes
) {
}
