package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.dto.category.CategoryRequest;
import by.dz.fruits_in_choco.fruits_in_choco.entity.category.Category;
import by.dz.fruits_in_choco.fruits_in_choco.mapper.CategoryMapper;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.CategoryServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import static by.dz.fruits_in_choco.fruits_in_choco.util.Constants.*;


@RestController
@RequestMapping("/api/v1")
public class CategoryController {

    private final CategoryServiceImpl categoryService;
    private final CategoryMapper mapper;

    public CategoryController(CategoryServiceImpl categoryService, CategoryMapper mapper) {
        this.categoryService = categoryService;
        this.mapper = mapper;
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(mapper.getCategoryById(id));
    }

    @GetMapping("/categories")
    public ResponseEntity<?> getCategories(
            @RequestParam(required = false, defaultValue = DEFAULT_PAGE) int page,
            @RequestParam(required = false, defaultValue = DEFAULT_PAGE_SIZE) int size,
            @RequestParam(required = false, defaultValue = DEFAULT_SORT_BY_FIELD) String sortBy,
            @RequestParam(required = false, defaultValue = DEFAULT_SORT_DIRECTION) String direction) {
        return ResponseEntity.ok(mapper.getCategories(page, size, direction, sortBy));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/admin/categories")
    public ResponseEntity<?> saveCategory(@RequestBody CategoryRequest request) {
        return ResponseEntity.ok(categoryService.saveCategory(request));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/admin/categories/{id}")
    public ResponseEntity<?> updateCategory(@RequestBody Category category, @PathVariable Long id) {
        return ResponseEntity.ok(categoryService.updateCategory(category, id));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/admin/categories/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategoryById(id);
        return ResponseEntity.ok(200);
    }
}
