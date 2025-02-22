package com.sashojoto.harvesthub.product;

import com.sashojoto.harvesthub.user.User;
import com.sashojoto.harvesthub.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ProductMapper mapper;
    private final UserService userService;

    @GetMapping("/api/product/{id}")
    public ProductDto getProduct(@PathVariable Long id) {
        Product product = productService.getProduct(id);
        return mapper.toDto(product);
    }

    @PostMapping("/api/product/create")
    public ProductDto createProduct(@RequestBody ProductDto productDto, @AuthenticationPrincipal User principal) {
        Product product = mapper.toProduct(productDto);
        User user = userService.getUserById(principal.getId());
        product.setOwner(user);

        Product productCreated = productService.createProduct(product);

        return mapper.toDto(productCreated);
    }

    // New endpoint to fetch all products
    @GetMapping("/api/products")
    public List<ProductDto> getAllProducts(@AuthenticationPrincipal User principal) {
        User user = userService.getUserById(principal.getId());
        List<Product> products = productService.getAllProducts(user);

        // Map products to DTOs
        return products.stream()
                .map(mapper::toDto)
                .toList();
    }

    @GetMapping("/api/products/search")
    public List<ProductDto> searchProducts(@RequestParam String query) {
        List<Product> products = productService.searchProducts(query);
        return products.stream()
                .map(mapper::toDto) // Map Product entities to DTOs
                .toList();
    }

    @GetMapping("/products/by-category")
    public ResponseEntity<List<ProductDto>> getProductsByCategory(@RequestParam String category) {
        try {
            // Fetch products based on category (map enums to your categories)
            List<ProductDto> products = productService.getProductsByCategory(category);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }
}