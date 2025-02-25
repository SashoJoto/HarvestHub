package com.sashojoto.harvesthub.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring") // Registers this mapper as a Spring Bean
public interface UserMapper {

    // Instance of the mapper
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    // Map User entity to UserDto
    @Mapping(target = "phoneNumber", source = "phoneNumber")
    @Mapping(target = "address", source = "address")
    @Mapping(target = "description", source = "description")
    UserDto userToUserDto(User user);
}