package by.dz.fruits_in_choco.fruits_in_choco.dto.product;

import lombok.Data;

import java.util.List;

@Data
public class ProductSearchRequest {
    private List<Short> categories;
}
