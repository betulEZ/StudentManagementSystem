package com.example.backend.service;

import com.example.backend.model.Lesson;
import com.example.backend.model.LessonDTO;
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

    public Lesson saveLesson(LessonDTO lessonDTO) {
        Lesson temp=new Lesson(null,lessonDTO.getName(),lessonDTO.getStudentList());
        return lessonRepository.save(temp);
    }
}
