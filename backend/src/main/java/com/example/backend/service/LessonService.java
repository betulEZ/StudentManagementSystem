package com.example.backend.service;

import com.example.backend.model.Lesson;
import com.example.backend.model.Student;
import com.example.backend.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LessonService {
    private final LessonRepository lessonRepository;
    public List<Lesson> getAllLessons() {
       return lessonRepository.findAll();
    }

    public Lesson saveLesson(Lesson lesson) {
        return lessonRepository.save(lesson);
    }
}
