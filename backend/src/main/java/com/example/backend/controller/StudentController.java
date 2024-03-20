package com.example.backend.controller;

import com.example.backend.model.Student;
import com.example.backend.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @PostMapping
    public Student saveNewStudent(@RequestBody Student student) {
        return studentService.saveStudent(student);
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
    public Student update(@PathVariable String id,@RequestBody Student student) {
        return studentService.update(id, student);
    }
    @DeleteMapping("/{id}")
    public void deleteStudentById(@PathVariable String id){
        studentService.deleteById(id);
    }
}
