package com.example.backend.controller;
import com.example.backend.model.Lesson;
import com.example.backend.model.LessonDTO;
import com.example.backend.service.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/lessons")
@RequiredArgsConstructor
public class LessonController {
    private final LessonService lessonService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Lesson saveNewLesson(@RequestBody LessonDTO lessonDTO) {
        return lessonService.saveLesson(lessonDTO);
    }

    @GetMapping
    public List<Lesson> getAllLessons(){
        return lessonService.getAllLessons();
    }
}
