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
    public ProductDto getProduct(@PathVariable Long id) {
        Product product = productService.getProduct(id);
        return mapper.toDto(product);
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
    public List<ProductDto> getAllProducts(@AuthenticationPrincipal User principal) {
        User user = userService.getUserByName(principal.getName());
        List<Product> products = productService.getAllProducts(user);

        // Map products to DTOs
        return products.stream()
                .map(mapper::toDto)
                .toList();
    }
}