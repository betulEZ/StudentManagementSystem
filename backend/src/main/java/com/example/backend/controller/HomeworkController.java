package com.example.backend.controller;
import com.example.backend.model.Homework;
import com.example.backend.service.HomeworkService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.ui.Model;
import java.io.IOException;
import java.util.Base64;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/homeworks")
public class HomeworkController {
    private final HomeworkService homeworkService;


}
