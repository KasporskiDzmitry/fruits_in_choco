package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.dto.category.CategoryPreview;
import by.dz.fruits_in_choco.fruits_in_choco.dto.category.CategoryRequest;
import by.dz.fruits_in_choco.fruits_in_choco.entity.Category;
import by.dz.fruits_in_choco.fruits_in_choco.exception.EntityNotFoundException;
import by.dz.fruits_in_choco.fruits_in_choco.service.CategoryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@AllArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/categories/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(categoryService.getCategoryById(id));
        } catch (EntityNotFoundException e) {
            log.error("Failed to get category with id " + id, e);
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryPreview>> getCategories() {
        return ResponseEntity.ok(categoryService.getCategories());
    }

    @PostMapping("/admin/categories")
    public ResponseEntity<Category> saveCategory(@RequestBody CategoryRequest request) {
        return ResponseEntity.ok(categoryService.saveCategory(request));
    }

    @PutMapping("/admin/categories/{id}")
    public ResponseEntity<Category> updateCategory(@RequestBody Category category, @PathVariable Long id) {
        return ResponseEntity.ok(categoryService.updateCategory(category, id));
    }

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
