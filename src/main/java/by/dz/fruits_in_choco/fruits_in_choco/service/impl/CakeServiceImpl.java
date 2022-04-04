package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.dto.cake.CakeConstructorDTO;
import by.dz.fruits_in_choco.fruits_in_choco.entity.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.ProductStatus;
import by.dz.fruits_in_choco.fruits_in_choco.entity.cake.*;
import by.dz.fruits_in_choco.fruits_in_choco.repository.*;
import by.dz.fruits_in_choco.fruits_in_choco.service.CakeService;
import by.dz.fruits_in_choco.fruits_in_choco.service.CategoryService;
import by.dz.fruits_in_choco.fruits_in_choco.service.ProductService;
import org.springframework.stereotype.Service;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;
import java.util.stream.Collectors;

@Service("cakeService")
public class CakeServiceImpl implements CakeService {
    private final CakeRepository cakeRepository;
    private final BiscuitRepository biscuitRepository;
    private final FillingRepository fillingRepository;
    private final DecorationRepository decorationRepository;
    private final ProductService productService;
    private final CategoryService categoryService;

    public CakeServiceImpl(CakeRepository cakeRepository, BiscuitRepository biscuitRepository, FillingRepository fillingRepository, DecorationRepository decorationRepository, ProductServiceImpl productService, CategoryServiceImpl categoryService) {
        this.cakeRepository = cakeRepository;
        this.biscuitRepository = biscuitRepository;
        this.fillingRepository = fillingRepository;
        this.decorationRepository = decorationRepository;
        this.productService = productService;
        this.categoryService = categoryService;
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
        cakeConstructorDTO.setBiscuits(biscuitRepository.findByStatus(CakeIngredientStatus.ACTIVE));
        cakeConstructorDTO.setFillings(fillingRepository.findByStatus(CakeIngredientStatus.ACTIVE));
        cakeConstructorDTO.setDecorations(decorationRepository.findByStatus(CakeIngredientStatus.ACTIVE));

        return cakeConstructorDTO;
    }

    @Override
    public Cake saveCake(Cake cake) {
        cake.setStatus(CakeStatus.NOT_CONFIRMED);

        Product cakeProduct = new Product();
        cakeProduct.setStatus(ProductStatus.NOT_CONFIRMED);
        cakeProduct.setPrice((int) cake.getPrice()); // need to change price type to double
        cakeProduct.setCategory(categoryService.getCategoryByName("Торты")); // change to constant

        productService.saveProduct(cakeProduct);
        return cakeRepository.save(cake);
    }

    @Override
    public void deleteCake(Long id) {
        cakeRepository.deleteById(id);
    }

    @Override
    public Cake updateCake(Cake newCake, Long id) {
        return cakeRepository.findById(id)
                .map(cake -> {
                    cake.setStatus(newCake.getStatus());
                    cake.setDecorations(newCake.getDecorations());
                    cake.setPrice(newCake.getPrice());
                    cake.setFillings(newCake.getFillings());
                    cake.setBiscuit(newCake.getBiscuit());
                    cake.setName(newCake.getName());
                    cake.setWeight(newCake.getWeight());
                    return cakeRepository.save(cake);
                })
                .orElseGet(() -> {
                    newCake.setId(id);
                    return cakeRepository.save(newCake);
                });
    }

    @Override
    public Biscuit createBiscuit(Biscuit biscuit) {
        return biscuitRepository.save(biscuit);
    }

    @Override
    public Filling createFilling(Filling filling) {
        return fillingRepository.save(filling);
    }

    @Override
    public Decoration createDecoration(Decoration decoration) {
        return decorationRepository.save(decoration);
    }

    @Override
    public Biscuit updateBiscuit(Biscuit newBiscuit, Long id) {
        return biscuitRepository.findById(id)
                .map(biscuit -> {
                    biscuit.setName(newBiscuit.getName());
                    biscuit.setPrice(newBiscuit.getPrice());
                    return biscuitRepository.save(biscuit);
                })
                .orElseGet(() -> {
                    newBiscuit.setId(id);
                    return biscuitRepository.save(newBiscuit);
                });
    }

    @Override
    public Filling updateFilling(Filling newFilling, Long id) {
        return fillingRepository.findById(id)
                .map(filling -> {
                    filling.setName(newFilling.getName());
                    filling.setPrice(newFilling.getPrice());
                    return fillingRepository.save(filling);
                })
                .orElseGet(() -> {
                    newFilling.setId(id);
                    return fillingRepository.save(newFilling);
                });
    }

    @Override
    public Decoration updateDecoration(Decoration newDecoration, Long id) {
        return decorationRepository.findById(id)
                .map(decoration -> {
                    decoration.setName(newDecoration.getName());
                    decoration.setPrice(newDecoration.getPrice());
                    return decorationRepository.save(decoration);
                })
                .orElseGet(() -> {
                    newDecoration.setId(id);
                    return decorationRepository.save(newDecoration);
                });
    }

    @Override
    public void deleteBiscuit(Long id) {
        Biscuit biscuit = biscuitRepository.findById(id).get();
        List<Cake> cakes = cakeRepository.findAll();
        List<Cake> cakeWithBiscuit = cakes
                .stream()
                .filter(cake -> cake.getBiscuit().equals(biscuit))
                .collect(Collectors.toList());

        if (cakeWithBiscuit.isEmpty()) {
            biscuitRepository.delete(biscuit);
        } else {
            biscuit.setStatus(CakeIngredientStatus.DELETED);
            biscuitRepository.save(biscuit);
        }
    }

    @Override
    public void deleteFilling(Long id) {
        Filling filling = fillingRepository.findById(id).get();
        List<Cake> cakes = cakeRepository.findAll();
        List<Cake> cakeWithFillings = cakes
                .stream()
                .filter(cake -> cake.getFillings().contains(filling))
                .collect(Collectors.toList());

        if (cakeWithFillings.isEmpty()) {
            fillingRepository.delete(filling);
        } else {
            filling.setStatus(CakeIngredientStatus.DELETED);
            fillingRepository.save(filling);
        }
    }

    @Override
    public void deleteDecoration(Long id) {
        Decoration decoration = decorationRepository.findById(id).get();
        List<Cake> cakes = cakeRepository.findAll();
        List<Cake> cakeWithDecorations = cakes
                .stream()
                .filter(cake -> cake.getDecorations().contains(decoration))
                .collect(Collectors.toList());

        if (cakeWithDecorations.isEmpty()) {
            decorationRepository.delete(decoration);
        } else {
            decoration.setStatus(CakeIngredientStatus.DELETED);
            decorationRepository.save(decoration);
        }
    }
}
