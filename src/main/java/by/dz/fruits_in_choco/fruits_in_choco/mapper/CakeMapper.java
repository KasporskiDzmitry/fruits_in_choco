package by.dz.fruits_in_choco.fruits_in_choco.mapper;

import by.dz.fruits_in_choco.fruits_in_choco.dto.cake.CakeConstructorDTO;
import by.dz.fruits_in_choco.fruits_in_choco.service.CakeService;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.CakeServiceImpl;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CakeMapper {

    private final ModelMapper modelMapper;
    private final CakeService cakeService;

}
