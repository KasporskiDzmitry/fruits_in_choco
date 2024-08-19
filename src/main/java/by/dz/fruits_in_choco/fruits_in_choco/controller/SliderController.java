package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.entity.slide.Slide;
import by.dz.fruits_in_choco.fruits_in_choco.exception.EntityNotFoundException;
import by.dz.fruits_in_choco.fruits_in_choco.service.SliderService;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.SliderServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/slide")
@Slf4j
public class SliderController {
    private final SliderService sliderService;

    public SliderController(SliderServiceImpl sliderService) {
        this.sliderService = sliderService;
    }

    @GetMapping
    public ResponseEntity<List<Slide>> getSlides() {
        return ResponseEntity.ok(sliderService.getSlides());
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Slide> saveSlide(@RequestBody Slide slide) {
        return ResponseEntity.ok(sliderService.saveSlide(slide));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Slide> updateSlide(@RequestBody Slide slide, @PathVariable Long id) {
        return ResponseEntity.ok(sliderService.updateSlide(slide, id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteSlide(@PathVariable Long id) {
        try {
            sliderService.deleteSlide(id);
            return ResponseEntity.ok(200);
        } catch (EntityNotFoundException e) {
            log.error("Failed to delete slide with id " + id , e);
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
