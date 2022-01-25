package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.dto.category.CategoryRequest;
import by.dz.fruits_in_choco.fruits_in_choco.entity.Category;
import by.dz.fruits_in_choco.fruits_in_choco.entity.ProductType;
import by.dz.fruits_in_choco.fruits_in_choco.repository.CategoryRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.ProductRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.ProductTypeRepository;
import by.dz.fruits_in_choco.fruits_in_choco.service.CategoryService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("categoryService")
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final ProductTypeRepository typeRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository, ProductRepository productRepository, ProductTypeRepository typeRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.typeRepository = typeRepository;
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
        category.setImageURL(request.getImageURL());

        Category savedCategory = categoryRepository.save(category);
        request.getTypes()
                .forEach(i -> {
                    ProductType type = new ProductType();
                    type.setName(i);
                    type.setCategory(savedCategory);
                    typeRepository.save(type);
                });
        return savedCategory;
    }

    @Override
    public Category updateCategory(Category newCategory, Long id) {
        return categoryRepository.findById(id)
                .map(category -> {
                    category.setName(newCategory.getName());
                    category.setDescription(newCategory.getDescription());
                    category.setImageURL(newCategory.getImageURL());
                    category.setTypes(newCategory.getTypes());
                    return categoryRepository.save(category);
                })
                .orElseGet(() -> {
                    newCategory.setId(id);
                    return categoryRepository.save(newCategory);
                });
    }

    @Override
    public void deleteCategoryById(Long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).get();
    }
}
