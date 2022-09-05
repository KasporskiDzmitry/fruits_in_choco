package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.entity.slide.Slide;
import by.dz.fruits_in_choco.fruits_in_choco.service.SliderService;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.SliderServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/slide")
public class SliderController {
    private final SliderService sliderService;

    public SliderController(SliderServiceImpl sliderService) {
        this.sliderService = sliderService;
    }

    @GetMapping
    public ResponseEntity<?> getSlides() {
        return ResponseEntity.ok(sliderService.getSlides());
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> saveSlide(@RequestBody Slide slide) {
        return ResponseEntity.ok(sliderService.saveSlide(slide));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateSlide(@RequestBody Slide slide, @PathVariable Short id) {
        return ResponseEntity.ok(sliderService.updateSlide(slide, id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteSlide(@PathVariable Short id) {
        sliderService.deleteSlide(id);
        return ResponseEntity.ok(200);
    }
}
