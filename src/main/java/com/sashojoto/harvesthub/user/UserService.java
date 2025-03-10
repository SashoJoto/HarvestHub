package com.sashojoto.harvesthub.user;

import com.sashojoto.harvesthub.exceptions.HarvestHubException;
import com.sashojoto.harvesthub.product.ProductDto;
import com.sashojoto.harvesthub.product.ProductMapper;
import com.sashojoto.harvesthub.product.ProductRepository;
import com.sashojoto.harvesthub.security.AuthController.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import com.sashojoto.harvesthub.product.Product;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final ProductRepository productRepository;
    private final ProductMapper mapper;

    public User createUser(User user) {
        userRepository.findByUsername(user.getUsername())
                .ifPresent(existing -> {
                    if (!existing.getId().equals(user.getId())) {
                        throw new HarvestHubException("Username is already in use.");
                    }
                });

        userRepository.findByEmail(user.getEmail())
                .ifPresent(existing -> {
                    if (!existing.getId().equals(user.getId())) {
                        throw new HarvestHubException("Email is already in use.");
                    }
                });

        if (user.getId() != null && user.getId() != -1) {
            User fromDb = userRepository.findById(user.getId())
                    .orElseThrow(() ->
                            new HarvestHubException("Can't find user for id: " + user.getId())
                    );
            user.setPassword(fromDb.getPassword());
        }

        return userRepository.save(user);
    }

    public UserDto getUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new HarvestHubException("Can't find user for id: " + userId)
        );
        return userMapper.userToUserDto(user);
    }

    public User login(LoginRequest loginRequest) {
        List<User> users = userRepository.findByUsernameAndPassword(
                loginRequest.getUsername(),
                loginRequest.getPassword()
        );

        if (users.isEmpty() || users.size() != 1) {
            return null;
        }

        return users.get(0);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new HarvestHubException("Can't find user for id: " + id));
    }

    public String saveProfilePicture(Long userId, MultipartFile imageFile) {
        User user = getUserById(userId);

        String uploadDir = "uploads/profile_pictures/";
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        String imagePath = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
        File imageFilePath = new File(dir, imagePath);

        try (FileOutputStream fos = new FileOutputStream(imageFilePath)) {
            fos.write(imageFile.getBytes());
        } catch (IOException e) {
            throw new HarvestHubException("Failed to save profile picture", e);
        }

        String imageUrl = "http://localhost:8080/profile_pictures/" + imagePath;
        user.setProfilePictureUrl(imageUrl);
        userRepository.save(user);

        return imageUrl;
    }

    public void addFavorites(Long userId, Long productId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new HarvestHubException("User not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new HarvestHubException("Product not found"));
        if (!user.getFavorites().contains(product)) {
            user.getFavorites().add(product);
            userRepository.save(user);
        }

    }

    public void removeFavorite(Long userId, Long productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new HarvestHubException("User not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new HarvestHubException("Product not found"));

        if (user.getFavorites().contains(product)) {
            user.getFavorites().remove(product);
            userRepository.save(user);
        }

    }

    public List<ProductDto> getFavorites(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new HarvestHubException("User not found"));

        return user.getFavorites().stream()
                .map(product -> mapper.toDto(product))
                .collect(Collectors.toList());
    }
}