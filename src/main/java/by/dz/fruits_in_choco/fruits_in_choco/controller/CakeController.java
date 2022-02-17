package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.service.CakeService;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.CakeServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
