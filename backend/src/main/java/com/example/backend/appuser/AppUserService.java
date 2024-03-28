package com.example.backend.appuser;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class AppUserService {
    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    public AppUserResponse create(AppUserDto appUserDto){
        String password = passwordEncoder.encode(appUserDto.password());
        AppUser appUser = appUserRepository.save(new AppUser().fromDto(appUserDto, password));
        return AppUserResponse.fromAppUser(appUser);
    }

    public AppUserResponse getByUsername(String username){
        AppUser appUser = appUserRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        return AppUserResponse.fromAppUser(appUser);
    }
}
