package com.example.eapteka;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;


    public Page<Product> getAllProducts(Pageable pageable){
        return productRepository.findAll(pageable);
    }

    public Long save(Product product){
        return productRepository.saveAndFlush(product).getId();
    }


    public String delete(Long id){
        if (productRepository.findById(id).isEmpty()) {
            return "Cant found";
        }
        else {
            productRepository.deleteById(id);
            return "Deleted";
        }

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

    public Product getByName(String productName) {
        return productRepository.findByName(productName);
    }
}
