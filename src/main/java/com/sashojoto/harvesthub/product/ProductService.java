package com.sashojoto.harvesthub.product;

import com.sashojoto.harvesthub.common.Category;
import com.sashojoto.harvesthub.exceptions.HarvestHubException;
import com.sashojoto.harvesthub.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper mapper;

    public Product createProduct(Product product, MultipartFile imageFile) {
        Product createdProduct = productRepository.save(product);
        saveProductImage(createdProduct, imageFile);
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

    public String saveProductImage(Product product, MultipartFile imageFile) {
        String uploadDir = "uploads/";
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs(); // Create directories if they don't exist
        }

        String imagePath = imageFile.getOriginalFilename();
        File imageFilePath = new File(dir, imagePath);
        try {
            FileOutputStream fos = new FileOutputStream(imageFilePath);
            fos.write(imageFile.getBytes());
        } catch (IOException e) {
            throw new HarvestHubException("Failed to save product image", e);
        }

        String imageUrl = "http://localhost:8080/" + imagePath; // Example: public URL
        product.setImageUrl(imageUrl);
        productRepository.save(product);

        return imageUrl;
    }

    public String saveProductImage(Long productId, MultipartFile imageFile) {
        Product product = getProduct(productId);
        return saveProductImage(product, imageFile);
    }
}
