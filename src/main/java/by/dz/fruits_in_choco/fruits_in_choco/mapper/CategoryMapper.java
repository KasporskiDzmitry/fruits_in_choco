package by.dz.fruits_in_choco.fruits_in_choco.mapper;

import by.dz.fruits_in_choco.fruits_in_choco.dto.category.CategoryResponse;
import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductTypeResponse;
import by.dz.fruits_in_choco.fruits_in_choco.entity.Category;
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
    private final ProductTypeMapper productTypeMapper;

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
        List<ProductTypeResponse> productTypeResponseList = category.getTypes()
                .stream()
                .map(productTypeMapper::convertToResponseDTO)
                .collect(Collectors.toList());

        CategoryResponse categoryResponse = modelMapper.map(category, CategoryResponse.class);
        categoryResponse.setTypes(productTypeResponseList);
        return categoryResponse;
    }
}
