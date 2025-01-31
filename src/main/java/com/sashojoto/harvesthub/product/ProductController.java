package com.sashojoto.harvesthub.product;

import com.sashojoto.harvesthub.user.User;
import com.sashojoto.harvesthub.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ProductMapper mapper;
    private final UserService userService;

    @GetMapping("/api/product/{id}")
    public Product getProduct(@PathVariable Long id) {
        return null;
    }

    @PostMapping("/api/product/create")
    public ProductDto createProduct(@RequestBody ProductDto productDto, @AuthenticationPrincipal User principal) {
        Product product = mapper.toProduct(productDto);
        User user = userService.getUserByName(principal.getName());
        product.setOwner(user);

        Product productCreated = productService.createProduct(product);

        return mapper.toDto(productCreated);
    }

    // New endpoint to fetch all products
    @GetMapping("/api/products")
    public List<ProductDto> getAllProducts() {
        // Get all products from the service layer
        List<Product> products = productService.getAllProducts();

        // Map products to DTOs
        return products.stream()
                .map(mapper::toDto)
                .toList();
    }
}