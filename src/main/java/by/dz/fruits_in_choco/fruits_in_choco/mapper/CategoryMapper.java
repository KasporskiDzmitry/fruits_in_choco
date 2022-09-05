package by.dz.fruits_in_choco.fruits_in_choco.mapper;

import by.dz.fruits_in_choco.fruits_in_choco.dto.category.CategoryResponse;
import by.dz.fruits_in_choco.fruits_in_choco.entity.category.Category;
import by.dz.fruits_in_choco.fruits_in_choco.service.CategoryService;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.CategoryServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CategoryMapper {

    private final CategoryService service;
    private final ModelMapper modelMapper;

    public CategoryMapper(CategoryServiceImpl service, ModelMapper modelMapper) {
        this.service = service;
        this.modelMapper = modelMapper;
    }

    public List<CategoryResponse> getCategories(int page, int size, String sortBy, String direction) {
        List<Category> categoryList = service.getCategories(page, size, sortBy, direction);
        return categoryList.stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public CategoryResponse getCategoryById(Short id) {
        return mapToResponseDTO(service.getCategoryById(id));
    }

    public CategoryResponse mapToResponseDTO(Category category) {
        return modelMapper.map(category, CategoryResponse.class);
    }
}
