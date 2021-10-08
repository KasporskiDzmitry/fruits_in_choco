package by.dz.fruits_in_choco.fruits_in_choco.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProductRequest {
    private List<Long> types;
}
