package com.sashojoto.harvesthub.user;

import com.sashojoto.harvesthub.exceptions.HarvestHubException;
import com.sashojoto.harvesthub.security.AuthController;
import com.sashojoto.harvesthub.security.AuthController.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Limit;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User createUser(User user) {
        User createdUser = userRepository.save(user);
        return createdUser;
    }

    public User getUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new HarvestHubException("Can't find user for id[%d]", userId));
        return user;
    }

    public boolean login(LoginRequest loginRequest) {
        List<User> users = userRepository.findByNameAndPassword(loginRequest.getUsername(), loginRequest.getPassword());
        return users.size() == 1;
    }

    public User getUserByName(String name) {
        return userRepository.findByName(name);
    }
}
