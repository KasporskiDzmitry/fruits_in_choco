package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.entity.Slide;
import by.dz.fruits_in_choco.fruits_in_choco.exception.EntityNotFoundException;
import by.dz.fruits_in_choco.fruits_in_choco.service.SliderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@AllArgsConstructor
public class SliderController {
    private final SliderService sliderService;

    @GetMapping("/slides")
    public ResponseEntity<List<Slide>> getSlides() {
        return ResponseEntity.ok(sliderService.getSlides());
    }

    @PostMapping("/admin/slides")
    public ResponseEntity<Slide> saveSlide(@RequestBody Slide slide) {
        return ResponseEntity.ok(sliderService.saveSlide(slide));
    }

    @PutMapping("/admin/slides/{id}")
    public ResponseEntity<Slide> updateSlide(@RequestBody Slide slide, @PathVariable Long id) {
        return ResponseEntity.ok(sliderService.updateSlide(slide, id));
    }

    @DeleteMapping("/admin/slides/{id}")
    public ResponseEntity<?> deleteSlide(@PathVariable Long id) {
        try {
            sliderService.deleteSlide(id);
            return ResponseEntity.ok(200);
        } catch (EntityNotFoundException e) {
            log.error("Failed to delete slide with id " + id, e);
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
