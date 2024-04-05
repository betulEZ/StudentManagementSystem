package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@With
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "lessons")
public class Lesson {
    private String id;
    private String name;
    List<Student> studentList;
    List<Attendance> attendanceList;

    public Lesson (LessonDTO lessonDTO){
        this(null, lessonDTO.getName(), lessonDTO.getStudentList(),lessonDTO.getAttendanceList());
    }
}
