package com.example.backend.controller;

import com.example.backend.model.LessonDTO;
import com.example.backend.model.Student;
import com.example.backend.model.StudentDTO;
import com.example.backend.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Student saveNewStudent(@RequestBody StudentDTO studentDto) {
        return studentService.saveStudent(studentDto);
    }
    @GetMapping
    public List<Student> getAllStudents(){
        return studentService.getAllTeachers();
    }
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable String id){
        return studentService.getStudentById(id);
    }

    @PutMapping("/{id}")
    public Student update(@PathVariable String id,@RequestBody StudentDTO studentDTO) {
        return studentService.update(id, studentDTO);
    }
    @PutMapping("/{id}/add-lesson")
    public Student addLesson(@PathVariable String id,@RequestBody LessonDTO lessonDto) {
        return studentService.addLesson(id, lessonDto);
    }
    @DeleteMapping("/{id}")
    public void deleteStudentById(@PathVariable String id){
        studentService.deleteById(id);
    }
    @DeleteMapping("/{id}/delete-lesson")
    public void deleteLessonStudentById(@PathVariable String id,@RequestBody LessonDTO  lessonDto){
        studentService.deleteLessonById(id,lessonDto);
    }
}
