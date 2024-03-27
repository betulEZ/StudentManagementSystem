package com.example.backend.service;

import com.example.backend.model.Lesson;
import com.example.backend.model.LessonDTO;
import com.example.backend.model.Student;
import com.example.backend.repository.LessonRepository;
import com.example.backend.repository.StudentRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;



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

    public List<Lesson> getAllLessonsByStudentId(String studentId) throws Exception {
        Optional<Student> studentOptional = studentRepository.findById(studentId);
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            List<Lesson> collect = student.getLessonList().stream()
                    .collect(Collectors.toList());
            return collect;
        } else {
            throw new Exception("Student not found with id: " + studentId);
        }
    }
}
