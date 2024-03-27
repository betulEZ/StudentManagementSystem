package com.example.backend.service;

import com.example.backend.exception.StudentNotFoundException;
import com.example.backend.model.Lesson;
import com.example.backend.model.LessonDTO;
import com.example.backend.model.Student;
import com.example.backend.repository.LessonRepository;
import com.example.backend.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;



@Service
@RequiredArgsConstructor
public class LessonService {
    private final LessonRepository lessonRepository;
    private final StudentRepository studentRepository;

    public List<Lesson> getAllLessons() {
       return lessonRepository.findAll();
    }

    public Lesson saveLesson(LessonDTO lessonDTO) {
        Lesson temp=new Lesson(null,lessonDTO.getName(),lessonDTO.getStudentList());
        return lessonRepository.save(temp);
    }

    public List<Lesson> getAllLessonsByStudentId(String studentId) throws StudentNotFoundException {
        Optional<Student> studentOptional = studentRepository.findById(studentId);
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            return new ArrayList<>(student.getLessonList());
        } else {
            throw new StudentNotFoundException("Student not found with id: " + studentId);
        }
    }
}
