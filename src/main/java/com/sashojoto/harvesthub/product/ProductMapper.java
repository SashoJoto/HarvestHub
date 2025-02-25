package com.sashojoto.harvesthub.product;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    @Mapping(source = "owner.id", target = "userId")
    @Mapping(source = "owner.username", target = "ownerName")
    ProductDto toDto(Product product);

    Product toProduct(ProductDto productDto);
}