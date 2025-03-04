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
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper mapper;
    private final ProductImageRepository productImageRepository;

    public Product createProduct(Product product, List<MultipartFile> imageFiles) {
        // Save product details first
        Product createdProduct = productRepository.save(product);

        // Save images
        saveProductImages(createdProduct, imageFiles);

        return createdProduct;
    }

    public List<Product> getAllProducts(User user) {
        return productRepository.findByOwnerId(user.getId());
    }

    public Product getProduct(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));
    }

    public List<Product> searchProducts(String query) {
        return productRepository.searchProducts(query);
    }

    public List<ProductDto> getProductsByCategory(String category) {
        // Map your category to enum or database field
        Category categoryEnum = Category.valueOf(category);

        // Fetch products from the repository
        List<Product> products = productRepository.findByCategory(categoryEnum);

        // Convert to ProductDto (use the mapper if you have one)
        return products.stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    public ProductDto getProductDto(Long productId) {
        // Use repository to find the product
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + productId));

        // Map the Product entity to ProductDto using the mapper
        return mapper.toDto(product);
    }


    public String saveProductImages(Long productId, List<MultipartFile> imageFiles) {
        // Find the product by `productId`
        Product product = getProduct(productId);

        // Use the private helper to save images
        return saveProductImages(product, imageFiles);
    }

    private String saveProductImages(Product product, List<MultipartFile> imageFiles) {
        String uploadDir = "uploads/";
        File dir = new File(uploadDir);

        if (!dir.exists()) {
            dir.mkdirs();
        }

        StringBuilder imageUrls = new StringBuilder();

        for (MultipartFile imageFile : imageFiles) {
            String uniqueFileName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();
            File file = new File(dir, uniqueFileName);

            try (FileOutputStream fos = new FileOutputStream(file)) {
                fos.write(imageFile.getBytes());
            } catch (IOException e) {
                throw new HarvestHubException("Failed to save image: " + uniqueFileName, e);
            }

            String imageUrl = "http://localhost:8080/uploads/" + uniqueFileName;

            // Save the image details in the database using `ProductImage`
            ProductImage productImage = new ProductImage();
            productImage.setImageUrl(imageUrl);
            productImage.setProduct(product);
            productImageRepository.save(productImage);

            if (imageUrls.length() > 0) {
                imageUrls.append(",");
            }
            imageUrls.append(imageUrl);
        }

        // Return all URLs
        return imageUrls.toString();
    }
}