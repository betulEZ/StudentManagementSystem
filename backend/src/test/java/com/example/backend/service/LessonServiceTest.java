package com.example.backend.service;

import com.example.backend.model.Homework;
import com.example.backend.model.Lesson;
import com.example.backend.model.LessonDTO;
import com.example.backend.repository.HomeworkRepository;
import com.example.backend.repository.LessonRepository;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class LessonServiceTest {
    private final LessonRepository lessonRepository=mock(LessonRepository.class);
    private final LessonService lessonService= new LessonService(lessonRepository);

    @Test
    void getAllLessons() {
        // GIVEN
        Lesson lessonList = new Lesson("101", "Math", null);
        List<Lesson> expected=List.of(lessonList);

        // WHEN
        when(lessonRepository.findAll()).thenReturn(expected);
        List<Lesson> actual=lessonService.getAllLessons();

        // THEN
        assertEquals(expected,actual);
        verify(lessonRepository).findAll();
        verifyNoMoreInteractions(lessonRepository);

    }

    @Test
    void saveLesson() {
        // GIVEN
        Lesson expected=new Lesson("Math101","Math",null);
        LessonDTO lessonDTO=new LessonDTO("Math",null);

        // WHEN
        when(lessonRepository.save(new Lesson(lessonDTO))).thenReturn(expected);
        Lesson result=lessonService.saveLesson(lessonDTO);

        // THEN
        assertEquals(expected,result);
    }
}