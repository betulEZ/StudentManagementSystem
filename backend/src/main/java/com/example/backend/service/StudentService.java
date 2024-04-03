package com.example.backend.service;

import com.example.backend.model.Lesson;
import com.example.backend.model.Student;
import com.example.backend.model.StudentDTO;
import com.example.backend.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;
    public Student saveStudent(StudentDTO studentDto) {
        Student temp=new Student(null,studentDto.getName(),studentDto.getSurname(),studentDto.getLessonList());
        return studentRepository.save(temp);
    }

    public List<Student> getAllTeachers() {
        return studentRepository.findAll();
    }

    public Student getStudentById(String id) {
        return studentRepository.findById(id).orElseThrow();
    }

    public Student update(String id, StudentDTO studentDTO) {
        Student temp=studentRepository.findById(id).orElseThrow();
        temp.setName(studentDTO.getName());
        temp.setSurname(studentDTO.getSurname());
        temp.setLessonList(studentDTO.getLessonList());
        return studentRepository.save(temp);
    }
    public String deleteById(String id) {
        studentRepository.deleteById(id);
        return "Student with ID: " + id + " deleted.";
    }

    public Student addLesson(String id, Lesson lesson) {
        Student temp=studentRepository.findById(id).orElseThrow();
        temp.getLessonList().add(lesson);
        return  studentRepository.save(temp);
    }

    public void deleteLessonById(String id, Lesson lesson) {
        Student temp=studentRepository.findById(id).orElseThrow();
        temp.getLessonList().remove(lesson);
        studentRepository.save(temp);
    }
}
