package com.sashojoto.harvesthub.user;

import com.sashojoto.harvesthub.exceptions.HarvestHubException;
import com.sashojoto.harvesthub.security.AuthController.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public User createUser(User user) {
        // Check if username already exists
        userRepository.findByUsername(user.getUsername())
                .ifPresent(existing -> {
                    throw new HarvestHubException("Username is already in use.");
                });

        // Check if email already exists
        userRepository.findByEmail(user.getEmail())
                .ifPresent(existing -> {
                    throw new HarvestHubException("Email is already in use.");
                });

        // If updating an existing user, retain the existing password
        if (user.getId() != null && user.getId() != -1) {
            User fromDb = userRepository.findById(user.getId())
                    .orElseThrow(() -> new HarvestHubException("Can't find user for id: " + user.getId()));
            user.setPassword(fromDb.getPassword());
        }

        // Save the new user
        return userRepository.save(user);
    }

    public UserDto getUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new HarvestHubException("Can't find user for id: " + userId)
        );
        return userMapper.userToUserDto(user);
    }

    public User login(LoginRequest loginRequest) {
        // Look up users by username and password
        List<User> users = userRepository.findByUsernameAndPassword(
                loginRequest.getUsername(),
                loginRequest.getPassword()
        );

        // Ensure exactly one user is found
        if (users.isEmpty() || users.size() != 1) {
            return null;
        }

        return users.get(0);
    }

    public User getUserById(Long id) {
        // Find user by ID with exception if not found
        return userRepository.findById(id)
                .orElseThrow(() -> new HarvestHubException("Can't find user for id: " + id));
    }
}