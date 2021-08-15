package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Category;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.productReview.ProductReview;
import by.dz.fruits_in_choco.fruits_in_choco.repository.CategoryRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.ProductRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.ProductReviewRepository;
import by.dz.fruits_in_choco.fruits_in_choco.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("productService")
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;
    private ProductReviewRepository productReviewRepository;
    private CategoryRepository categoryRepository;

    public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository, ProductReviewRepository productReviewRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.productReviewRepository = productReviewRepository;
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getProductsFilteredByTypes(List<Integer> types) {
        List<Product> products = productRepository.findByProductType_IdIn(types);
//        List<Product> filteredProducts = new ArrayList<>();
//        for (Product p : products) {
//            if (types.contains(p.getProductType().getId())) {
//                filteredProducts.add(p);
//            }
//        }
//        return filteredProducts;
        return products;
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public List<ProductReview> getReviewsByProductId(int id) {
        return null;
//        return productRepository
//        return productReviewRepository.findAllByProduct_Id(id);
    }

    public Product getProductById(int id) {
        return productRepository.findById(id);
    }

}
