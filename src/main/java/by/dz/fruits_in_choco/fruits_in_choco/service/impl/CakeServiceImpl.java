package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.dto.cake.CakeConstructorDTO;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Biscuit;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Cake;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Decoration;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Filling;
import by.dz.fruits_in_choco.fruits_in_choco.repository.*;
import by.dz.fruits_in_choco.fruits_in_choco.service.CakeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("cakeService")
public class CakeServiceImpl implements CakeService {
    private final CakeRepository cakeRepository;
    private final BiscuitRepository biscuitRepository;
    private final FillingRepository fillingRepository;
    private final DecorationRepository decorationRepository;

    public CakeServiceImpl(CakeRepository cakeRepository, BiscuitRepository biscuitRepository, FillingRepository fillingRepository, DecorationRepository decorationRepository) {
        this.cakeRepository = cakeRepository;
        this.biscuitRepository = biscuitRepository;
        this.fillingRepository = fillingRepository;
        this.decorationRepository = decorationRepository;
    }

    @Override
    public List<Cake> getAllCakes() {
        return cakeRepository.findAll();
    }

    @Override
    public List<Biscuit> getAllBiscuits() {
        return biscuitRepository.findAll();
    }

    @Override
    public List<Filling> getAllFillings() {
        return fillingRepository.findAll();
    }

    @Override
    public List<Decoration> getAllDecorations() {
        return decorationRepository.findAll();
    }

    @Override
    public CakeConstructorDTO getConstructorData() {
        CakeConstructorDTO cakeConstructorDTO = new CakeConstructorDTO();
        cakeConstructorDTO.setBiscuits(biscuitRepository.findAll());
        cakeConstructorDTO.setFillings(fillingRepository.findAll());
        cakeConstructorDTO.setDecorations(decorationRepository.findAll());

        return cakeConstructorDTO;
    }
}
