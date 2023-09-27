package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.dto.category.CategoryRequest;
import by.dz.fruits_in_choco.fruits_in_choco.entity.category.Category;
import by.dz.fruits_in_choco.fruits_in_choco.entity.category.CategoryAttribute;
import by.dz.fruits_in_choco.fruits_in_choco.exception.EntityNotFoundException;
import by.dz.fruits_in_choco.fruits_in_choco.repository.CategoryAttributeRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.CategoryRepository;
import by.dz.fruits_in_choco.fruits_in_choco.service.CategoryService;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service("categoryService")
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryAttributeRepository categoryAttributeRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository, CategoryAttributeRepository categoryAttributeRepository) {
        this.categoryRepository = categoryRepository;
        this.categoryAttributeRepository = categoryAttributeRepository;
    }

    @Override
    public List<Category> getCategories(int page, int size, String direction, String sortBy) {
        Page<Category> categoryPage =  categoryRepository.findAll(PageRequest.of(page ,size, Sort.Direction.fromString(direction), sortBy));
        return categoryPage.getContent();
    }

    @Override
    public Category saveCategory(CategoryRequest request) {
        Category category = new Category();
        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setAttributes(request.getAttributes());
        category.setImageURL(request.getImageURL());
        Category savedCategory = categoryRepository.save(category);
        for (CategoryAttribute attribute: request.getAttributes()) {
            attribute.setCategory(savedCategory);
            savedCategory.getAttributes().add(categoryAttributeRepository.save(attribute));
        }
        return savedCategory;
    }

    @Override
    public Category updateCategory(Category newCategory, Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(Category.class.getSimpleName(), id));
        category.setName(newCategory.getName());
        category.setDescription(newCategory.getDescription());
        category.setImageURL(newCategory.getImageURL());
        category.setAttributes(newCategory.getAttributes());
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategoryById(Long id) {
        try {
            categoryRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new EntityNotFoundException(Category.class.getSimpleName(), id);
        }
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(Category.class.getSimpleName(), id));
    }
}
