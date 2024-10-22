package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.entity.Slide;
import by.dz.fruits_in_choco.fruits_in_choco.service.SliderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
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
    public ResponseEntity<Slide> saveSlide(@NotNull @RequestBody Slide slide) {
        return ResponseEntity.status(201).body(sliderService.saveSlide(slide));
    }

    @PutMapping("/admin/slides/{id}")
    public ResponseEntity<Slide> updateSlide(@NotNull @RequestBody Slide slide, @PathVariable Long id) {
        return ResponseEntity.ok(sliderService.updateSlide(slide, id));
    }

    @DeleteMapping("/admin/slides/{id}")
    public ResponseEntity<?> deleteSlide(@PathVariable Long id) {
        sliderService.deleteSlide(id);
        return ResponseEntity.ok().build();
    }
}
