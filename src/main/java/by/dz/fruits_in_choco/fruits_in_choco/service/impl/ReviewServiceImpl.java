package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.entity.Review;
import by.dz.fruits_in_choco.fruits_in_choco.repository.ReviewRepository;
import by.dz.fruits_in_choco.fruits_in_choco.service.ReviewService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("reviewService")
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository repository;

    public ReviewServiceImpl(ReviewRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Review> getAllReview() {
        return repository.findAll();
    }

    @Override
    public void saveAll(List<Review> reviews) {
        repository.saveAll(reviews);
    }
}
