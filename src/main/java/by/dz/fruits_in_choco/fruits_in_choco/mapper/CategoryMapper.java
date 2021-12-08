package by.dz.fruits_in_choco.fruits_in_choco.mapper;

import by.dz.fruits_in_choco.fruits_in_choco.dto.CategoryResponse;
import by.dz.fruits_in_choco.fruits_in_choco.dto.ProductTypeResponse;
import by.dz.fruits_in_choco.fruits_in_choco.entity.Category;
import by.dz.fruits_in_choco.fruits_in_choco.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CategoryMapper {

    private final CategoryService service;
    private final ProductMapper productMapper;

    public List<CategoryResponse> getCategories(int page, int size, String sortBy, String direction) {
        List<Category> categoryList = service.getCategories(page, size, sortBy, direction);
        return categoryList.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    public CategoryResponse getCategoryById(Long id) {
        return convertToResponseDTO(service.getCategoryById(id));
    }

    private CategoryResponse convertToResponseDTO(Category category) {
        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setId(category.getId());
        categoryResponse.setName(category.getName());
        categoryResponse.setDescription(category.getDescription());
        categoryResponse.setImageURL(category.getImageURL());

        categoryResponse.setTypes(category.getTypes().stream()
                .map(type -> {
                    ProductTypeResponse productTypeResponse = new ProductTypeResponse();
                    productTypeResponse.setId(type.getId());
                    productTypeResponse.setName(type.getName());
                    productTypeResponse.setProducts(type.getProducts().stream()
                            .map(productMapper::convertToResponseDTO)
                            .collect(Collectors.toList()));
                    return productTypeResponse;
                }).collect(Collectors.toList()));
        return categoryResponse;
    }
}
