package com.sashojoto.harvesthub;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SimpleApiController {

    @GetMapping("/api/hello")
    public String getMessage() {
        return "Hello from Spring Boot Backend!";
    }
}
