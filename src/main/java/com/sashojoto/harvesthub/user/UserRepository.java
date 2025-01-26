package com.sashojoto.harvesthub.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByNameAndPassword(String name, String password);
}
