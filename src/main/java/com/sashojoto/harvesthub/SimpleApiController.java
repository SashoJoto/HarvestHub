package com.sashojoto.harvesthub;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SimpleApiController {

    @GetMapping("/api4/hello")
    public User getMessage() {
        User user = new User(Long.valueOf(1L), "Sashojoto");
        return user;
    }
}
