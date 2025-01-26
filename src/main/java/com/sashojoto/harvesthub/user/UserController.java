package com.sashojoto.harvesthub.user;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return null;
    }

    @PostMapping("/register")
    public User createUser(@RequestBody User user) {
        User userCreated = userService.createUser(user);
        return userCreated;
    }

}
