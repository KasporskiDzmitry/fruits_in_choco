package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.dto.category.CategoryRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.category.CategoryResponse;
import by.dz.fruits_in_choco.fruits_in_choco.entity.category.Category;
import by.dz.fruits_in_choco.fruits_in_choco.exception.EntityNotFoundException;
import by.dz.fruits_in_choco.fruits_in_choco.mapper.CategoryMapper;
import by.dz.fruits_in_choco.fruits_in_choco.service.CategoryService;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.CategoryServiceImpl;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static by.dz.fruits_in_choco.fruits_in_choco.util.Constants.*;

@RestController
@RequestMapping("/api/v1")
public class CategoryController {
    private final static Logger log = LogManager.getLogger(CategoryController.class);
    private final CategoryService categoryService;
    private final CategoryMapper mapper;

    public CategoryController(CategoryServiceImpl categoryService, CategoryMapper mapper) {
        this.categoryService = categoryService;
        this.mapper = mapper;
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(mapper.getCategoryById(id));
        } catch (EntityNotFoundException e) {
            log.error("Failed to get category with id " + id, e);
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryResponse>> getCategories(
            @RequestParam(required = false, defaultValue = DEFAULT_PAGE) int page,
            @RequestParam(required = false, defaultValue = DEFAULT_PAGE_SIZE) int size,
            @RequestParam(required = false, defaultValue = DEFAULT_SORT_BY_FIELD) String sortBy,
            @RequestParam(required = false, defaultValue = DEFAULT_SORT_DIRECTION) String direction) {
        return ResponseEntity.ok(mapper.getCategories(page, size, direction, sortBy));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/admin/categories")
    public ResponseEntity<Category> saveCategory(@RequestBody CategoryRequest request) {
        return ResponseEntity.ok(categoryService.saveCategory(request));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/admin/categories/{id}")
    public ResponseEntity<Category> updateCategory(@RequestBody Category category, @PathVariable Long id) {
        return ResponseEntity.ok(categoryService.updateCategory(category, id));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/admin/categories/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        try {
            categoryService.deleteCategoryById(id);
            return ResponseEntity.ok(200);
        } catch (EntityNotFoundException e) {
            log.error("Failed to delete category with " + id, e);
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
