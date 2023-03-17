package by.dz.fruits_in_choco.fruits_in_choco.mapper;

import by.dz.fruits_in_choco.fruits_in_choco.dto.CartResponse;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cart.Cart;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class CartMapper {
    private final ModelMapper modelMapper;

    public CartMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public CartResponse mapToResponseDTO(Cart cart) {
        return modelMapper.map(cart, CartResponse.class);
    }
}
