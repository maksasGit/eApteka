package com.example.eapteka;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {
    public final CartRepository cartRepository;
    public final UserRepository userRepository;
    public final ProductRepository productRepository;


    public void addProductToCart(Long userId, Long productId, int amount) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            cart = new Cart();
            cart.setUser(user);
            cartRepository.save(cart);
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem existingItem = null;
        for (CartItem item : cart.getItems()) {
            if (item.getProduct().getId().equals(productId)) {
                existingItem = item;
                break;
            }
        }

        if (existingItem != null) {
            existingItem.setAmount(existingItem.getAmount() + amount);
        } else {
            CartItem newItem = new CartItem();
            newItem.setProduct(product);
            newItem.setCart(cart);
            newItem.setAmount(amount);
            cart.getItems().add(newItem);
        }

        cartRepository.save(cart);
    }

    public BigDecimal totalCost(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return cart.totalCost();
    }

}
