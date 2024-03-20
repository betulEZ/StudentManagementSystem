package com.example.backend.service;

import com.example.backend.model.Student;
import com.example.backend.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    public List<Student> getAllTeachers() {
        return studentRepository.findAll();
    }

    public Student getStudentById(String id) {
        return studentRepository.findById(id).orElseThrow();
    }

    public Student update(String id, Student student) {
        Student temp=studentRepository.findById(id).orElseThrow();
        temp.setName(student.getName());
        temp.setSurname(student.getSurname());
        temp.setLessonList(student.getLessonList());
        return studentRepository.save(temp);
    }
    public String deleteById(String id) {
        studentRepository.deleteById(id);
        return "Student with ID: " + id + " deleted.";
    }
}
