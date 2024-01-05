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

    // ##################################
    // #################################
    // POST
    // ##################################
    // ##################################


    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    // ##################################
    // #################################
    // PUT
    // ##################################
    // ##################################


    public Product updateProduct(Long id, Product productDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
        if (productDetails.getName() != null) {
            updateProductName(id,productDetails.getName());
        }
        if (productDetails.getPrice() != null) {
            updateProductPrice(id,productDetails.getPrice());
        }
        if (productDetails.getDescription() != null) {
            updateProductDescription(id,productDetails.getDescription());
        }
        if (productDetails.getAmount() != null) {
            updateProductAmount(id,productDetails.getAmount());
        }
        return productRepository.save(product);
    }

    public Product updateProductQuantity(Long id, int amountChange) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));

        int newAmount = product.getAmount() + amountChange;
        product.setAmount(newAmount);
        return productRepository.save(product);
    }

    public Product updateProductName(Long id, String newName) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
        product.setName(newName);
        return productRepository.save(product);
    }
    public Product updateProductPrice(Long id, BigDecimal newPrice) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
        product.setPrice(newPrice);
        return productRepository.save(product);
    }
    public Product updateProductDescription(Long id, String newDescription) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
        product.setDescription(newDescription);
        return productRepository.save(product);
    }
    public Product updateProductAmount(Long id, Integer newAmount) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
        product.setAmount(newAmount);
        return productRepository.save(product);
    }



    // ##################################
    // #################################
    // GET
    // ##################################
    // ##################################


    public Product getById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
    }
    public Product getByName(String name) {
        Product product = productRepository.findByName(name);
        if (product != null) {
            return product;
        } else {
            throw new RuntimeException("Product not found with name: " + name);
        }
    }
    public Page<Product> getAllProducts(Pageable pageable){
        return productRepository.findAll(pageable);
    }
    public Page<Product> searchProducts(String name, Double minPrice, Double maxPrice, Boolean amount,  Pageable pageable) {
        Specification<Product> spec = Specification.where(null);
        if (name != null) {
            spec = spec.and(ProductSpecifications.withName(name));
        }
        if (minPrice != null && maxPrice != null) {
            spec = spec.and(ProductSpecifications.withPriceBetween(minPrice, maxPrice));
        }
        if (amount != null){
            spec = spec.and(ProductSpecifications.amountGreatThenZero(amount));
        }
        return productRepository.findAll(spec, pageable);
    }


    // ##################################
    // #################################
    // DELETE
    // ##################################
    // ##################################


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
