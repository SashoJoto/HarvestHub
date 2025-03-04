package com.sashojoto.harvesthub.user;

import com.sashojoto.harvesthub.exceptions.HarvestHubException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import com.sashojoto.harvesthub.product.ProductDto;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public UserDto getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            User userCreated = userService.createUser(user);
            return ResponseEntity.ok(userCreated);
        } catch (HarvestHubException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping(path = "/{userId}/profile-picture",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadProfilePicture(
            @PathVariable Long userId,
            @RequestPart("image") MultipartFile imageFile) {

        // Save the profile picture using the UserService
        String imageUrl = userService.saveProfilePicture(userId, imageFile);

        return ResponseEntity.ok(imageUrl); // Return the image URL
    }


    @PostMapping("/{userId}/favorites/{productId}")
    public ResponseEntity<Void> addFavorite(@PathVariable Long userId, @PathVariable Long productId) {
        userService.addFavorites(userId, productId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{userId}/favorites/{productId}")
    public ResponseEntity<Void> removeFavorite(@PathVariable Long userId, @PathVariable Long productId) {
        userService.removeFavorite(userId, productId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}/favorites")
    public ResponseEntity<List<ProductDto>> getFavorites(@PathVariable Long userId) {
        List<ProductDto> favorites = userService.getFavorites(userId);
        return ResponseEntity.ok(favorites);
    }
}
