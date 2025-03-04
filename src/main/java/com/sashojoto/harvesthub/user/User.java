package com.sashojoto.harvesthub.user;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import com.sashojoto.harvesthub.product.Product;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema
@Entity(name = "Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String firstName;
    private String lastName;
    @Column(nullable = false, unique = true) // Ensures no duplicate usernames
    private String username;

    @Column(nullable = false, unique = true) // Ensures no duplicate emails
    private String email;
    private String password;
    private String phoneNumber;
    private String address;
    private String description;
    private String profilePictureUrl;

    @ManyToMany
    @JoinTable(
            name = "favorites", // Name of the join table
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> favorites;
}
