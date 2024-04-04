package com.example.backend.appuser;

import com.example.backend.model.Student;
import com.example.backend.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class AppUserService {
    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final StudentRepository studentRepository;

    public AppUserResponse create(AppUserDto appUserDto){
        String password = passwordEncoder.encode(appUserDto.password());
        Student student=new Student();
        student.setName(appUserDto.name());
        student.setSurname(appUserDto.surname());
        student.setLessonList(new ArrayList<>());
        Student save= studentRepository.save(student);
        AppUser appUser = new AppUser().fromDto(appUserDto, password);
        appUser.setStudentId(save.getId());
        appUser.setName(save.getName());
        appUser.setSurname(save.getSurname());
        AppUser savedAppUser=appUserRepository.save(appUser);
        return AppUserResponse.fromAppUser(savedAppUser);
    }

    public AppUserResponse getByUsername(String username){
        AppUser appUser = appUserRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        return AppUserResponse.fromAppUser(appUser);
    }
}
