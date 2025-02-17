package com.sashojoto.harvesthub.product;

import com.sashojoto.harvesthub.common.Category;
import com.sashojoto.harvesthub.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper mapper;

    public Product createProduct(Product product) {
        Product createdProduct = productRepository.save(product);
        return createdProduct;
    }

    public List<Product> getAllProducts(User user) {
        return productRepository.findByOwnerId(user.getId());
    }

    public Product getProduct(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Product not found"));
    }

    public List<Product> searchProducts(String query) {
        return productRepository.searchProducts(query);
    }

    public List<ProductDto> getProductsByCategory(String category) {
        // Map your category to enum or database field
        Category categoryEnum = Category.valueOf(category);

        // Fetch products from the repository (assuming ProductRepository exists)
        List<Product> products = productRepository.findByCategory(categoryEnum);

        // Convert to ProductDto (use a mapper if you have one)
        return products.stream()
                .map(mapper::toDto) // Assuming you have a mapper
                .collect(Collectors.toList());
    }
}
