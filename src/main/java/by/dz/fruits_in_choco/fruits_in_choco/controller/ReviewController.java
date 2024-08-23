package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.entity.Review;
import by.dz.fruits_in_choco.fruits_in_choco.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ReviewController {
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/reviews")
    public ResponseEntity<List<Review>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReview());
    }


    @PostMapping("/admin/reviews")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> saveAll(@RequestBody List<Review> reviews) {
        reviewService.saveAll(reviews);
        return ResponseEntity.status(201).build();
    }
}
