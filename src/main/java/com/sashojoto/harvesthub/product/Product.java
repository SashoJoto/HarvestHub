package com.sashojoto.harvesthub.product;

import com.sashojoto.harvesthub.common.Category;
import com.sashojoto.harvesthub.common.Currency;
import com.sashojoto.harvesthub.common.ShippingResponsibility;
import com.sashojoto.harvesthub.common.Units;
import com.sashojoto.harvesthub.user.User;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema
@Entity(name = "Products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Currency currency;
    private Units units;
    private Integer quantity;
    private ShippingResponsibility shippingResponsibility;
    private Category category;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;
}
