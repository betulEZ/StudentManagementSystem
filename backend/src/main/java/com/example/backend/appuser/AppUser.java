package com.example.backend.appuser;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
@NoArgsConstructor
@Data
@Document(collection = "appusers")
@AllArgsConstructor
public class AppUser {
    @Id
    private String id;
    @Indexed(unique = true)
    private String username;
    private String password;
    @Indexed(unique = true)
    private String email;
    private String avatarUrl;
    private AppUserRole role;

    public AppUser fromDto(AppUserDto appUserDto, String password) {
        return new AppUser(
                null,
                appUserDto.username(),
                password,
                appUserDto.email(),
                appUserDto.avatarUrl(),
                AppUserRole.TEACHER
        );
    }
}
