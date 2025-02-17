package com.sashojoto.harvesthub.product;

import com.sashojoto.harvesthub.common.Category;
import com.sashojoto.harvesthub.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByOwnerId(Long id);

    @Query("SELECT p FROM Products p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Product> searchProducts(@Param("query") String query);

    List<Product> findByCategory(Category category);
}
