package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.dto.CategoryRequest;
import by.dz.fruits_in_choco.fruits_in_choco.entity.Category;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.CategoryServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import static by.dz.fruits_in_choco.fruits_in_choco.util.Constants.*;


@RestController
public class CategoryController {

    private final CategoryServiceImpl categoryService;

    public CategoryController(CategoryServiceImpl categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    @GetMapping("/category")
    public ResponseEntity<?> getCategories(
            @RequestParam(required = false, defaultValue = DEFAULT_PAGE) int page,
            @RequestParam(required = false, defaultValue = DEFAULT_PAGE_SIZE) int size,
            @RequestParam(required = false, defaultValue = DEFAULT_SORT_BY_FIELD) String sortBy,
            @RequestParam(required = false, defaultValue = DEFAULT_SORT_DIRECTION) String direction) {
        return ResponseEntity.ok(categoryService.getCategories(page, size, direction, sortBy));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/admin/category")
    public ResponseEntity<?> saveCategory(@RequestBody CategoryRequest request) {
        return ResponseEntity.ok(categoryService.saveCategory(request));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/admin/category/{id}")
    public ResponseEntity<?> updateCategory(@RequestBody Category category, @PathVariable Long id) {
        return ResponseEntity.ok(categoryService.updateCategory(category, id));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/admin/category/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategoryById(id);
        return ResponseEntity.ok(200);
    }
}
