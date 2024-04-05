package com.example.backend.service;

import com.example.backend.exception.StudentNotFoundException;
import com.example.backend.model.*;
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
        Lesson temp=new Lesson(null,lessonDTO.getName(),lessonDTO.getStudentList(), lessonDTO.getAttendanceList());
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

    public List<AttendanceDTO> getAllAttendance() {
        List<AttendanceDTO> allAttendance = new ArrayList<>();
        List<Lesson> allLessons = lessonRepository.findAll();

        for (Lesson lesson : allLessons) {
            allAttendance.addAll(lesson.getAttendanceList());
        }
        return allAttendance;
    }

    public AttendanceDTO saveAttendance(String lessonId, AttendanceDTO attendance) {
        Lesson lesson=lessonRepository.findById(lessonId).orElseThrow();

        List<AttendanceDTO> attendanceList = lesson.getAttendanceList();
        attendanceList.add(attendance);
        lesson.setAttendanceList(attendanceList);
        lessonRepository.save(lesson);

        return attendance;
    }

    public void deleteAttendance(String lessonId, AttendanceDTO attendance) {
        Optional<Lesson> optionalLesson = lessonRepository.findById(lessonId);
        if (optionalLesson.isPresent()) {
            Lesson lesson = optionalLesson.get();
            lesson.getAttendanceList().removeIf(a -> a.equals(attendance));
            lessonRepository.save(lesson);
        }
    }
}
