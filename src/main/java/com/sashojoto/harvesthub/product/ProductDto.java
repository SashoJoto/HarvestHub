package com.sashojoto.harvesthub.product;

import com.sashojoto.harvesthub.common.Currency;
import com.sashojoto.harvesthub.common.ShippingResponsibility;
import com.sashojoto.harvesthub.common.Units;
import com.sashojoto.harvesthub.user.User;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Currency currency;
    private Units units;
    private Integer quantity;
    private ShippingResponsibility shippingResponsibility;

    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public Units getUnits() {
        return units;
    }

    public void setUnits(Units units) {
        this.units = units;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public ShippingResponsibility getShippingResponsibility() {
        return shippingResponsibility;
    }

    public void setShippingResponsibility(ShippingResponsibility shippingResponsibility) {
        this.shippingResponsibility = shippingResponsibility;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

}
