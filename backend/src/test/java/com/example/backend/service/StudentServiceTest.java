package com.example.backend.service;

import com.example.backend.model.Lesson;
import com.example.backend.model.LessonDTO;
import com.example.backend.model.Student;
import com.example.backend.model.StudentDTO;
import com.example.backend.repository.StudentRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class StudentServiceTest {
    private final StudentRepository studentRepository=mock(StudentRepository.class);
    private final StudentService studentService=new StudentService(studentRepository);

    @Test
    void saveStudent() {
        // GIVEN
        Student expected =new Student("1","name","surname",null);
        StudentDTO studentDTO= new StudentDTO("name","surname",null);

        // WHEN
        when(studentRepository.save(new Student(studentDTO))).thenReturn(expected);
        Student result=studentService.saveStudent(studentDTO);

        // THEN
        assertEquals(expected,result);
    }
}