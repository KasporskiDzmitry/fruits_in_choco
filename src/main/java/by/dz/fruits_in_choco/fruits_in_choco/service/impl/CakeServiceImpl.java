package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.ProductStatus;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Cake;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.CakeIngredientStatus;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.CakeStatus;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Ingredient;
import by.dz.fruits_in_choco.fruits_in_choco.repository.CakeRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.IngredientRepository;
import by.dz.fruits_in_choco.fruits_in_choco.service.CakeService;
import by.dz.fruits_in_choco.fruits_in_choco.service.CategoryService;
import by.dz.fruits_in_choco.fruits_in_choco.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static by.dz.fruits_in_choco.fruits_in_choco.util.Constants.CATEGORY_CAKES;

@Service("cakeService")
public class CakeServiceImpl implements CakeService {
    private final CakeRepository cakeRepository;
    private final IngredientRepository ingredientRepository;
    private final ProductService productService;
    private final CategoryService categoryService;

    public CakeServiceImpl(CakeRepository cakeRepository, IngredientRepository ingredientRepository, ProductServiceImpl productService, CategoryServiceImpl categoryService) {
        this.cakeRepository = cakeRepository;
        this.ingredientRepository = ingredientRepository;
        this.productService = productService;
        this.categoryService = categoryService;
    }

    @Override
    public List<Cake> getAllCakes() {
        return cakeRepository.findAll();
    }

    @Override
    public List<Ingredient> getConstructorData() {
        return ingredientRepository.findByStatus(CakeIngredientStatus.ACTIVE);
    }

    @Override
    public Cake saveCake(Cake cake) {
        Product cakeProduct = new Product();
        cakeProduct.setStatus(ProductStatus.NOT_CONFIRMED);
        cakeProduct.setPrice(cake.getPrice());
        cakeProduct.setCategory(categoryService.getCategoryByName(CATEGORY_CAKES));

        productService.saveProduct(cakeProduct);

        cake.setStatus(CakeStatus.NOT_CONFIRMED);
        return cakeRepository.save(cake);
    }

    @Override
    public void deleteCake(Short id) {
        cakeRepository.deleteById(id);
    }

    @Override
    public Cake updateCake(Cake newCake, Short id) {
        return cakeRepository.findById(id)
                .map(cake -> {
                    cake.setStatus(newCake.getStatus());
                    cake.setIngredients(newCake.getIngredients());
                    cake.setPrice(newCake.getPrice());
                    cake.setName(newCake.getName());
                    cake.setWeight(newCake.getWeight());
                    return cakeRepository.save(cake);
                })
                .orElseGet(() -> {
                    newCake.setId(id);
                    return cakeRepository.save(newCake);
                });
    }

    public Ingredient updateIngredient(Ingredient newIngredient, Short id) {
        return ingredientRepository.findById(id)
                .map(ingredient -> {
                    ingredient.setName(newIngredient.getName());
                    ingredient.setPrice(newIngredient.getPrice());
                    return ingredientRepository.save(ingredient);
                })
                .orElseGet(() -> {
                    newIngredient.setId(id);
                    return ingredientRepository.save(newIngredient);
                });
    }

    public void deleteIngredient(Short id) {
        Ingredient ingredient = ingredientRepository.findById(id).get();
        List<Cake> cakes = cakeRepository.findAll();
        List<Cake> cakeWithIngredients = cakes
                .stream()
                .filter(cake -> cake.getIngredients().contains(ingredient))
                .collect(Collectors.toList());

        if (cakeWithIngredients.isEmpty()) {
            ingredientRepository.delete(ingredient);
        } else {
            ingredient.setStatus(CakeIngredientStatus.DELETED);
            ingredientRepository.save(ingredient);
        }
    }

    @Override
    public Ingredient createIngredient(Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }
}
