package by.dz.fruits_in_choco.fruits_in_choco.mapper;

import by.dz.fruits_in_choco.fruits_in_choco.service.CakeService;
import by.dz.fruits_in_choco.fruits_in_choco.service.impl.CakeServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class CakeMapper {

    private final ModelMapper modelMapper;
    private final CakeService cakeService;

    public CakeMapper(ModelMapper modelMapper, CakeServiceImpl cakeService) {
        this.modelMapper = modelMapper;
        this.cakeService = cakeService;
    }
}
