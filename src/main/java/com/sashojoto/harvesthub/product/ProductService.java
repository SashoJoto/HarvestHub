package com.sashojoto.harvesthub.product;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Product createProduct(Product product) {
        Product createdProduct = productRepository.save(product);
        return createdProduct;
    }
}
