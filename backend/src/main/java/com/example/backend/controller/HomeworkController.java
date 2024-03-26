package com.example.backend.controller;
import com.example.backend.model.Homework;
import com.example.backend.service.HomeworkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/homeworks")
public class HomeworkController {
    private final HomeworkService homeworkService;
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Homework saveNewHomework(@RequestBody Homework homework) {
        return homeworkService.saveHomework(homework);
    }

}
