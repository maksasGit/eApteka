package com.example.eapteka;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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


    public void delete(Long id){
        productRepository.deleteById(id);
    }

    public Page<Product> getByParam(String name, Double minPrice, Double maxPrice) {
     //   return productRepository.findAll(name , minPrice , maxPrice);
    }
}
