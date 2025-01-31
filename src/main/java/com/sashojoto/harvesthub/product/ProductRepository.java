package com.sashojoto.harvesthub.product;

import com.sashojoto.harvesthub.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByOwnerId(Long id);
}
