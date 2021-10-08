package by.dz.fruits_in_choco.fruits_in_choco.service;


import by.dz.fruits_in_choco.fruits_in_choco.entity.Category;

import java.util.List;

public interface CategoryService {
    Category getCategoryById(Long id);

    List<Category> getCategories(int page, int size, String direction, String sortBy);

    Category saveCategory(Category category);

    Category updateCategory(Category category, Long id);

    void deleteCategoryById(Long id);
}
