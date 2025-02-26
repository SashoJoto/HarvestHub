package com.sashojoto.harvesthub.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByUsernameAndPassword(String username, String password);

    Optional<User> findByUsername(String username);

    // Check if a user with the given email exists
    Optional<User> findByEmail(String email);

}
