package com.sashojoto.harvesthub.product;

import com.sashojoto.harvesthub.user.User;
import com.sashojoto.harvesthub.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ProductMapper mapper;
    private final UserService userService;

    /**
     * Get product details by ID (Including its images)
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable Long id) {
        try {
            ProductDto productDto = productService.getProductDto(id);
            return ResponseEntity.ok(productDto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    /**
     * Create a new product with its images
     */
    @PostMapping("/create")
    public ResponseEntity<ProductDto> createProduct(
            @RequestBody ProductDto productDto,
            @RequestParam("image") List<MultipartFile> imageFiles,
            @AuthenticationPrincipal User principal
    ) {
        try {
            Product product = mapper.toProduct(productDto);
            User user = userService.getUserById(principal.getId());
            product.setOwner(user);

            Product createdProduct = productService.createProduct(product, imageFiles);
            return ResponseEntity.ok(mapper.toDto(createdProduct));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get all products for the authenticated user
     */
    @GetMapping("/all")
    public ResponseEntity<List<ProductDto>> getAllProducts(@AuthenticationPrincipal User principal) {
        try {
            User user = userService.getUserById(principal.getId());
            List<Product> products = productService.getAllProducts(user);

            List<ProductDto> productDtos = products.stream()
                    .map(mapper::toDto)
                    .toList();

            return ResponseEntity.ok(productDtos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Search for products by a query string
     */
    @GetMapping("/search")
    public ResponseEntity<List<ProductDto>> searchProducts(@RequestParam String query) {
        try {
            List<Product> products = productService.searchProducts(query);

            List<ProductDto> productDtos = products.stream()
                    .map(mapper::toDto)
                    .toList();

            return ResponseEntity.ok(productDtos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get products by category
     */
    @GetMapping("/by-category")
    public ResponseEntity<List<ProductDto>> getProductsByCategory(@RequestParam String category) {
        try {
            List<ProductDto> products = productService.getProductsByCategory(category);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }

    /**
     * Upload images for a specific product
     */
    @PostMapping("/{productId}/images")
    public ResponseEntity<String> uploadProductImages(
            @PathVariable Long productId,
            @RequestPart("images") List<MultipartFile> imageFiles
    ) {
        try {
            String imageUrls = productService.saveProductImages(productId, imageFiles);
            return ResponseEntity.ok("Images uploaded successfully! URLs: " + imageUrls);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}