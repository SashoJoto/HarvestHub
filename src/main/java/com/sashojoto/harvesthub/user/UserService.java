package com.sashojoto.harvesthub.user;

import com.sashojoto.harvesthub.exceptions.HarvestHubException;
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

    public User getUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new HarvestHubException("Can't find user for id[%d]", userId));
        return user;
    }
}
