package com.example.backend.service;

import com.example.backend.model.Lesson;
import com.example.backend.model.Student;
import com.example.backend.model.StudentDTO;
import com.example.backend.repository.StudentRepository;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

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

    @Test
    void testGetAllStudent() {
        // GIVEN
        List<Lesson> lessonList = Arrays.asList(
                new Lesson(null,"Math",null),
                new Lesson(null,"Science",null)
        );
        List<Student> expectedStudents = Arrays.asList(
                new Student("1", "John","doe",lessonList),
                new Student("2", "Alice","doe",lessonList)
        );
        when(studentRepository.findAll()).thenReturn(expectedStudents);

        // WHEN
        List<Student> result = studentService.getAllTeachers();

        // THEN
        assertEquals(expectedStudents, result);
    }
    @Test
    void testDeleteById() {
        // GIVEN
        String studentId = "1";

        // WHEN
        String result = studentService.deleteById(studentId);

        // THEN
        verify(studentRepository, times(1)).deleteById(studentId);
        assertEquals("Student with ID: " + studentId + " deleted.", result);
    }
}