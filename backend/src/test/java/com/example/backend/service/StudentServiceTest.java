package com.example.backend.service;

import com.example.backend.model.Lesson;
import com.example.backend.model.LessonDTO;
import com.example.backend.model.Student;
import com.example.backend.model.StudentDTO;
import com.example.backend.repository.LessonRepository;
import com.example.backend.repository.StudentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class StudentServiceTest {
    private final StudentRepository studentRepository=mock(StudentRepository.class);
    private final LessonRepository lessonRepository=mock(LessonRepository.class);;
    private final StudentService studentService=new StudentService(studentRepository,lessonRepository);

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
    @Test
    void testAddLesson_UniqueLesson() {
        // GIVEN
        String studentId = "1";
        LessonDTO lessonDto = new LessonDTO("Math", null);
        Student existingStudent = new Student(studentId, "John", "Doe", new ArrayList<>());

        when(studentRepository.findById(studentId)).thenReturn(Optional.of(existingStudent));
        when(studentRepository.save(any(Student.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // WHEN
        Student updatedStudent = studentService.addLesson(studentId, lessonDto);

        // THEN
        assertNotNull(updatedStudent);
        assertEquals(1, updatedStudent.getLessonList().size());
        assertEquals("Math", updatedStudent.getLessonList().get(0).getName());
    }
    @Test
    void testDeleteLessonById() {
        // GIVEN
        String studentId = "1";
        LessonDTO lessonDto = new LessonDTO("Math", null);
        Student existingStudent = new Student(studentId, "John", "Doe", new ArrayList<>());
        Lesson lesson = new Lesson(lessonDto);
        existingStudent.getLessonList().add(lesson);

        when(studentRepository.findById(studentId)).thenReturn(Optional.of(existingStudent));
        when(lessonRepository.findAll()).thenReturn(existingStudent.getLessonList());

        // WHEN
        studentService.deleteLessonById(studentId, lessonDto);

        // THEN
        verify(studentRepository, times(1)).findById(studentId);
        verify(studentRepository, times(1)).save(existingStudent);
        assertEquals(0, existingStudent.getLessonList().size());
    }



}