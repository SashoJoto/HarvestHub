package com.sashojoto.harvesthub.product;

import com.sashojoto.harvesthub.common.Category;
import com.sashojoto.harvesthub.common.Currency;
import com.sashojoto.harvesthub.common.ShippingResponsibility;
import com.sashojoto.harvesthub.common.Units;
import io.swagger.v3.oas.annotations.media.Schema;
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
    private Category category;

    private Long userId;
    private String ownerName;
    private String ownerAddress;
}
