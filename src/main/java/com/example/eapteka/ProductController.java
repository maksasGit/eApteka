package com.example.eapteka;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ProductController {

    private final ProductService productService;

    @GetMapping("/products")
    public Page<Product> getAll(Pageable pageable){
        return productService.getAllProducts(pageable);
    }


    @PostMapping("/product")
    public Long save(@RequestBody Product product){
        return productService.save(product);
    }

}
