package by.dz.fruits_in_choco.fruits_in_choco.mapper;

import by.dz.fruits_in_choco.fruits_in_choco.dto.CategoryResponse;
import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductResponse;
import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductTypeResponse;
import by.dz.fruits_in_choco.fruits_in_choco.entity.Category;
import by.dz.fruits_in_choco.fruits_in_choco.entity.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.ProductType;
import by.dz.fruits_in_choco.fruits_in_choco.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CategoryMapper {

    private final CategoryService service;
    private final ModelMapper modelMapper;

    public List<CategoryResponse> getCategories(int page, int size, String sortBy, String direction) {
        List<Category> categoryList = service.getCategories(page, size, sortBy, direction);
        return categoryList.stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public CategoryResponse getCategoryById(Long id) {
        return mapToResponseDTO(service.getCategoryById(id));
    }

    public CategoryResponse mapToResponseDTO(Category category) {
        return modelMapper.map(category, CategoryResponse.class);
    }
}
