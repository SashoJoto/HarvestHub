package com.sashojoto.harvesthub.user;

import com.sashojoto.harvesthub.exceptions.HarvestHubException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

}
