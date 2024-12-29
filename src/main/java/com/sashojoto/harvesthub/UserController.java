package com.sashojoto.harvesthub;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/api/user/{id}")
    public User getUser(@PathVariable Long id) {
        return null;
    }

    @PostMapping("/api/user/create")
    public User createUser(@RequestBody User user) {
        User userCreated = userService.createUser(user);
        return userCreated;
    }

}
