package com.example.backend.controller;
import com.example.backend.exception.StudentNotFoundException;
import com.example.backend.model.AttendanceDTO;
import com.example.backend.model.Lesson;
import com.example.backend.model.LessonDTO;
import com.example.backend.service.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/lessons")
@RequiredArgsConstructor
public class LessonController {
    private final LessonService lessonService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Lesson saveNewLesson(@RequestBody LessonDTO lessonDTO) {
        return lessonService.saveLesson(lessonDTO);
    }

    @GetMapping
    public List<Lesson> getAllLessons(){
        return lessonService.getAllLessons();
    }

    @GetMapping("/student/{studentId}")
    public List<Lesson> getAllLessonsByStudentId(@PathVariable String studentId) throws StudentNotFoundException {
        return lessonService.getAllLessonsByStudentId(studentId);
    }
    @GetMapping("/all-attendance")
    public List<AttendanceDTO> getAllAttendance(){
            return lessonService.getAllAttendance();
    }
    @PostMapping("/save-attendance/{lessonId}")
    @ResponseStatus(HttpStatus.CREATED)
    public AttendanceDTO saveAttendanceByLessonId(@PathVariable String lessonId, @RequestBody AttendanceDTO attendance){
        return lessonService.saveAttendance(lessonId,attendance);
    }
    @DeleteMapping("/delete-announcement/{lessonId}")
    public void deleteAttendance(@PathVariable String lessonId,@RequestBody AttendanceDTO attendance){
        lessonService.deleteAttendance(lessonId, attendance);
    }
    @GetMapping("/{lessonId}")
    public List<AttendanceDTO> getAllAttendanceByLessonId(@PathVariable String lessonId){
        return lessonService.getAllAnnouncementByLessonId(lessonId);
    }
}
