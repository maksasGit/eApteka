package com.example.eapteka;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "products")
public class Product {

    //    {
//        "name": "Product Name",
//            "price": 10.99,
//            "description": "Product Description",
//            "imageUrl": "https://example.com/image.jpg",
//            "amount": 100
//    }


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Name cannot be null")
    @Column(nullable = false, length = 100)
    private String name;

    @NotNull(message = "Price cannot be null")
    @DecimalMin(value = "0.01", inclusive = true, message = "Price must be greater than 0")
    @Column(nullable = false)
    private BigDecimal price;

//        @NotNull(message = "Price cannot be null")
//    @DecimalMin(value = "0.01", inclusive = true, message = "Price must be greater than 0")
//    @Column(nullable = false)
//    private BigDecimal maxPrice;
//
//        @NotNull(message = "Price cannot be null")
//    @DecimalMin(value = "0.01", inclusive = true, message = "Price must be greater than 0")
//    @Column(nullable = false)
//    private BigDecimal minPrice;

    @Column(length = 500)
    private String description;

    @Column(length = 500)
    private String imageUrl;

    @Min(value = 0, message = "Amount cannot be less than 0")
    @Column(nullable = false)
    private Integer amount;

}
