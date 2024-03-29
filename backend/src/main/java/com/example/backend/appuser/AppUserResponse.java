package com.example.backend.appuser;
public record AppUserResponse(
        String id,
        String username,
        String email,
        String avatarUrl,
        AppUserRole role,
        String studentId
) {
    public static AppUserResponse fromAppUser(AppUser appUser) {
        return new AppUserResponse(
                appUser.getId(),
                appUser.getUsername(),
                appUser.getEmail(),
                appUser.getAvatarUrl(),
                appUser.getRole(),
                appUser.getStudentId()
        );
    }
}