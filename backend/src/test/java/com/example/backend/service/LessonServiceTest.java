package com.example.backend.service;

import com.example.backend.model.Lesson;
import com.example.backend.model.LessonDTO;
import com.example.backend.model.Student;
import com.example.backend.repository.LessonRepository;
import com.example.backend.repository.StudentRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class LessonServiceTest {
    private final LessonRepository lessonRepository = mock(LessonRepository.class);
    private final StudentRepository studentRepository = mock(StudentRepository.class); // Provide StudentRepository as well
    private final LessonService lessonService = new LessonService(lessonRepository, studentRepository); // Pass both repositories

    @Test
    void getAllLessons() {
        // GIVEN
        List<Student> studentList=new ArrayList<>();
        studentList.add(new Student("1","name","surname",null));
        Lesson lessonList = new Lesson("101", "Math", studentList);
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
        List<Student> studentList=new ArrayList<>();
        studentList.add(new Student("1","name","surname",null));
        Lesson expected=new Lesson("Math101","Math",studentList);
        LessonDTO lessonDTO=new LessonDTO("Math",studentList);

        // WHEN
        when(lessonRepository.save(new Lesson(lessonDTO))).thenReturn(expected);
        Lesson result=lessonService.saveLesson(lessonDTO);

        // THEN
        assertEquals(expected,result);
    }
    @Test
    void testGetAllLessonsByStudentId() throws Exception {
        // GIVEN
        String studentId = "1";
        Student student = new Student();
        student.setId(studentId);
        List<Lesson> lessonList = Arrays.asList(
                new Lesson(null,"Math",null),
                new Lesson(null,"Science",null)
        );
        student.setLessonList(lessonList);

        // WHEN
        when(studentRepository.findById(studentId)).thenReturn(Optional.of(student));
        List<Lesson> result = lessonService.getAllLessonsByStudentId(studentId);

        // THEN
        assertEquals(lessonList, result);
    }
}