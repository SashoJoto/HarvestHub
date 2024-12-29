package com.sashojoto.harvesthub;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User createUser(User user) {
        User createdUser = userRepository.save(user);
        return createdUser;
    }
}
