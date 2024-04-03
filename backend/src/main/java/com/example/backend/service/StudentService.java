package com.example.backend.service;

import com.example.backend.model.Lesson;
import com.example.backend.model.LessonDTO;
import com.example.backend.model.Student;
import com.example.backend.model.StudentDTO;
import com.example.backend.repository.LessonRepository;
import com.example.backend.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;
    private final LessonRepository lessonRepository;
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

    public Student addLesson(String id, LessonDTO lessonDto) {
        Student temp = studentRepository.findById(id).orElseThrow();

        List<Lesson> lessonList = temp.getLessonList();

        boolean lessonExists = lessonList.stream()
                .anyMatch(lesson -> lesson.getName().equals(lessonDto.getName()));

        if (!lessonExists) {
            Lesson lesson = new Lesson();
            lesson.setName(lessonDto.getName());
            lesson.setStudentList(lessonDto.getStudentList());

            temp.getLessonList().add(lesson);
            return studentRepository.save(temp);
        } else {
            throw new IllegalArgumentException("A course with the same name already exists");
        }
    }



    public void deleteLessonById(String id, LessonDTO lessonDto) {
        Student temp = studentRepository.findById(id).orElseThrow();

        List<Lesson> lessonList = lessonRepository.findAll();

        Lesson lessonToRemove = lessonList.stream()
                .filter(lesson -> lesson.getName().equals(lessonDto.getName()))
                .findFirst()
                .orElseThrow();

        temp.getLessonList().remove(lessonToRemove);
        studentRepository.save(temp);
    }

}
