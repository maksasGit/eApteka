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



    // stack the same

    @PostMapping("/product")
    public void createNew(@RequestBody Product product){
        productService.createProduct(product);
    }



    @GetMapping("/products/{productName}")
    public Product showProduct(@PathVariable String productName){
        return productService.getByName(productName);
    }


    @PostMapping("/productdel")
    public String delete(@RequestParam Long id){
        return productService.deleteById(id);
    }

// add amount > 0;
    // add defaoult value
    @GetMapping("/productsfilter")
    public Page<Product> searchProduct(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            Pageable pageable
    ){
        return productService.searchProducts(name,minPrice,maxPrice,pageable );
    }

}
