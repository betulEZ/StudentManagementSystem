package com.example.backend.appuser;


import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class AppUserController {
    private final AppUserService appUserService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AppUserResponse register(@RequestBody AppUserDto appUserDto){
        return appUserService.create(appUserDto);
    }

    @GetMapping("/me")
    public AppUserResponse getMe(){
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return appUserService.getByUsername(principal.getUsername());
    }

    @PostMapping("/login")
    public void login(){
        // This method is only here to make the login endpoint accessible to the frontend
    }

    @PostMapping("/logout")
    public void logout(HttpSession session){
        session.invalidate();
        SecurityContextHolder.clearContext();
    }

    @GetMapping("/role-admin")
    public String helloAdmin(){
        return "Hello Admin";
    }
}