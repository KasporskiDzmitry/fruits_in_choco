package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Cake;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Ingredient;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.CakeServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
public class CakeController {

    private final CakeServiceImpl cakeService;

    public CakeController(CakeServiceImpl cakeService) {
        this.cakeService = cakeService;
    }

    @GetMapping("/constructor")
    public ResponseEntity<?> getConstructorData() {
        return ResponseEntity.ok(cakeService.getConstructorData());
    }

    @GetMapping("/cakes")
    public ResponseEntity<?> getAllCakes() {
        return ResponseEntity.ok(cakeService.getAllCakes());
    }

    @PostMapping("/cakes")
    public ResponseEntity<?> saveCake(Cake cake) {
        return ResponseEntity.ok(cakeService.saveCake(cake));
    }

    @DeleteMapping("/cakes/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteCake(@PathVariable Long id) {
        cakeService.deleteCake(id);
        return ResponseEntity.ok(200);
    }

    @PutMapping("/cakes/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateCake(@RequestBody Cake cake, @PathVariable Long id) {
        return ResponseEntity.ok(cakeService.updateCake(cake, id));
    }

    @PostMapping("/ingredient")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> createIngredient(@RequestBody Ingredient ingredient) {
        return ResponseEntity.ok(cakeService.createIngredient(ingredient));
    }

    @PutMapping("/ingredient/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateIngredient(@RequestBody Ingredient ingredient, @PathVariable Long id) {
        return ResponseEntity.ok(cakeService.updateIngredient(ingredient, id));
    }

    @DeleteMapping("/ingredient/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteBiscuit(@PathVariable Long id) {
        cakeService.deleteIngredient(id);
        return ResponseEntity.ok(200);
    }
}
