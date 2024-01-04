package com.example.eapteka;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    // create ( new )
    public Product createProduct(Product product) {
        // Дополнительные проверки и логика, если необходимы.
        return productRepository.save(product);
    }

    // update ( name )

    public Product updateProductName(Long id, String newName) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
        product.setName(newName);
        return productRepository.save(product);
    }


    // update ( price )

    public Product updateProductPrice(Long id, BigDecimal newPrice) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
        product.setPrice(newPrice);
        return productRepository.save(product);
    }


    // update ( desc )

    public Product updateProductDescription(Long id, String newDescription) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
        product.setDescription(newDescription);
        return productRepository.save(product);
    }


    // update ( amount )

    public Product updateProductAmount(Long id, Integer newAmount) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
        product.setAmount(newAmount);
        return productRepository.save(product);
    }


    public Product getById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
    }


    // get by name
    public Product getByName(String name) {
        Product product = productRepository.findByName(name);
        if (product != null) {
            return product;
        } else {
            throw new RuntimeException("Product not found with name: " + name);
        }
    }



    // get All
    public Page<Product> getAllProducts(Pageable pageable){
        return productRepository.findAll(pageable);
    }



    public Page<Product> searchProducts(String name, Double minPrice, Double maxPrice, Pageable pageable) {
        Specification<Product> spec = Specification.where(null);

        if (name != null) {
            spec = spec.and(ProductSpecifications.withName(name));
        }

        if (minPrice != null && maxPrice != null) {
            spec = spec.and(ProductSpecifications.withPriceBetween(minPrice, maxPrice));
        }

        return productRepository.findAll(spec, pageable);
    }



    public String deleteById(Long id) {
        return productRepository.findById(id)
                .map(product -> {
                    productRepository.delete(product);
                    return "Deleted";
                })
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
    }


    public String deleteByName(String name) {
        Product product = productRepository.findByName(name);
        if (product != null) {
            productRepository.delete(product);
            return "Deleted";
        } else {
            throw new RuntimeException("Product not found with name: " + name);
        }
    }



}
