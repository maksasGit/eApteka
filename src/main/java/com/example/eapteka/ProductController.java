package com.example.eapteka;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

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

// add amount > 0;
    @GetMapping("/prooductfilter")
    public Page<Product> getWithFilter(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice
    ){
        return productService.getByParam(name,minPrice,maxPrice);
    }

}
