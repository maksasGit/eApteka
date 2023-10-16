package com.example.eapteka;

import org.springframework.data.jpa.domain.Specification;

public class ProductSpecifications {
    public static Specification<Product> withName(String name) {
        return (root, query, builder) ->
                builder.like(root.get("name"), "%" + name + "%");
    }

    public static Specification<Product> withPriceBetween(Double minPrice, Double maxPrice) {
        return (root, query, builder) ->
                builder.between(root.get("price"), minPrice, maxPrice);
    }
}
