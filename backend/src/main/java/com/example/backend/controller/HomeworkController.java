package com.example.backend.controller;
import com.example.backend.model.Homework;
import com.example.backend.model.HomeworkDTO;
import com.example.backend.service.HomeworkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/homeworks")
public class HomeworkController {
    private final HomeworkService homeworkService;
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Homework saveNewHomework(@RequestBody HomeworkDTO homeworkDTO) {return homeworkService.saveHomework(homeworkDTO);
    }
    @GetMapping("/{lessonId}")
    public List<Homework> getHomeworkByLessonId(@PathVariable String lessonId) {
        return homeworkService.getAllHomeworkByLessonId(lessonId);
    }
}
