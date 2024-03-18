package by.dz.fruits_in_choco.fruits_in_choco.dto;

public record ProductRatingRequest(
        Long userId,
        String author,
        int rating,
        String message,
        boolean approved
) {
}
