package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.dto.cake.CakeConstructorDTO;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Biscuit;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Cake;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Decoration;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.Filling;

import java.util.List;

public interface CakeService {

    List<Cake> getAllCakes();

    List<Biscuit> getAllBiscuits();

    List<Filling> getAllFillings();

    List<Decoration> getAllDecorations();

    CakeConstructorDTO getConstructorData();
}
