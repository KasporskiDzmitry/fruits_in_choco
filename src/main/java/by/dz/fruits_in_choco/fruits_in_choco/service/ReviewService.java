package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.entity.Review;

import java.util.List;

public interface ReviewService {
    List<Review> getAllReview();
    void saveAll(List<Review> reviews);
}
