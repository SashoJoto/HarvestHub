package com.sashojoto.harvesthub.product;

import com.sashojoto.harvesthub.user.User;
import com.sashojoto.harvesthub.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
    public ProductDto createUser(@RequestBody ProductDto productDto) {
        Product product = mapper.toProduct(productDto);
        User user = userService.getUser(productDto.getUserId());
        product.setOwner(user);

        Product productCreated = productService.createProduct(product);

        return mapper.toDto(productCreated);
    }

}
