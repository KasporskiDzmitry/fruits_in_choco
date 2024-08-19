package by.dz.fruits_in_choco.fruits_in_choco.mapper;

import by.dz.fruits_in_choco.fruits_in_choco.dto.category.CategoryPreview;
import by.dz.fruits_in_choco.fruits_in_choco.entity.Category;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class CategoryMapper {
    private final ModelMapper modelMapper;

    public CategoryPreview mapToCategoryPreview(Category category) {
        return modelMapper.map(category, CategoryPreview.class);
    }
}
