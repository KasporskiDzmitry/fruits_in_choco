package by.dz.fruits_in_choco.fruits_in_choco.dto.category;

import javax.validation.constraints.NotBlank;

public record CategoryRequest(

        @NotBlank
        String title,

        @NotBlank
        String description,

        @NotBlank
        String mainImageURL
) {
}
