package com.sashojoto.harvesthub.product;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    @Mapping(source = "owner.id", target = "userId")
    @Mapping(source = "owner.username", target = "ownerName")
    @Mapping(source = "owner.address", target = "ownerAddress")
    @Mapping(source = "images", target = "imageUrls", qualifiedByName = "mapImagesToUrls")
    ProductDto toDto(Product product);

    Product toProduct(ProductDto productDto);

    // Custom mapping method for images
    @Named("mapImagesToUrls")
    static List<String> mapImagesToUrls(List<ProductImage> images) {
        if (images == null) {
            return null;
        }
        return images.stream()
                .map(ProductImage::getImageUrl) // Use getImageUrl for the correct field
                .collect(Collectors.toList());
    }

}