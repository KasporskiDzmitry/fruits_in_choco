package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.dto.cake.CakeDTO;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Biscuit;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Cake;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Decoration;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Filling;
import by.dz.fruits_in_choco.fruits_in_choco.service.CakeService;
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

    @PostMapping("/biscuits")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> createBiscuit(@RequestBody Biscuit biscuit) {
        return ResponseEntity.ok(cakeService.createBiscuit(biscuit));
    }

    @PostMapping("/fillings")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> createFilling(@RequestBody Filling filling) {
        return ResponseEntity.ok(cakeService.createFilling(filling));
    }

    @PostMapping("/decorations")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> createDecoration(@RequestBody Decoration decoration) {
        return ResponseEntity.ok(cakeService.createDecoration(decoration));
    }

    @PutMapping("/biscuits/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateBiscuit(@RequestBody Biscuit biscuit, @PathVariable Long id) {
        return ResponseEntity.ok(cakeService.updateBiscuit(biscuit, id));
    }

    @PutMapping("/fillings/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateFilling(@RequestBody Filling filling, @PathVariable Long id) {
        return ResponseEntity.ok(cakeService.updateFilling(filling, id));
    }

    @PutMapping("/decorations/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateDecoration(@RequestBody Decoration decoration, @PathVariable Long id) {
        return ResponseEntity.ok(cakeService.updateDecoration(decoration, id));
    }

    @DeleteMapping("/biscuits/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteBiscuit(@PathVariable Long id) {
        cakeService.deleteBiscuit(id);
        return ResponseEntity.ok(200);
    }

    @DeleteMapping("/fillings/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteFilling(@PathVariable Long id) {
        cakeService.deleteFilling(id);
        return ResponseEntity.ok(200);
    }

    @DeleteMapping("/decorations/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteDecoration(@PathVariable Long id) {
        cakeService.deleteDecoration(id);
        return ResponseEntity.ok(200);
    }
}
