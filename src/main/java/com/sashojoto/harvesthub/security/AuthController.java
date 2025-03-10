package com.sashojoto.harvesthub.security;

import com.sashojoto.harvesthub.user.User;
import com.sashojoto.harvesthub.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final JwtTokenUtil jwtTokenUtil;
    private final UserService userService;

    @GetMapping("/validate")
    public ResponseEntity<Boolean> validateToken() {
        return ResponseEntity.ok(Boolean.valueOf(true));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User loggedinUser = userService.login(loginRequest);
        if (loggedinUser != null) {
            String token = jwtTokenUtil.generateToken(loggedinUser);
            return ResponseEntity.ok(new JwtResponse(token));
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    static class JwtResponse {
        private String token;

        public JwtResponse(String token) {
            this.token = token;
        }

        public String getToken() {
            return token;
        }
    }
}