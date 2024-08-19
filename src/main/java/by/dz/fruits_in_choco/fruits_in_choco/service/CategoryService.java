package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.dto.category.CategoryRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.category.CategoryPreview;
import by.dz.fruits_in_choco.fruits_in_choco.entity.Category;

import java.util.List;

public interface CategoryService {
    Category getCategoryById(Long id);

    List<CategoryPreview> getCategories();

    Category saveCategory(CategoryRequest request);

    Category updateCategory(Category category, Long id);

    void deleteCategoryById(Long id);
}
