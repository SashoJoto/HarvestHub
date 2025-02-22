package com.sashojoto.harvesthub.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring") // Registers this mapper as a Spring Bean
public interface UserMapper {

    // Instance of the mapper
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    // Map User entity to UserDto
    // @Mapping(target = "password", ignore = true) // Ensure the password field is not included
    UserDto userToUserDto(User user);
}