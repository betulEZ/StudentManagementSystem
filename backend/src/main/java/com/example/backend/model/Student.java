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
@Document(collection = "students")
public class Student {
    private String id;
    private String name;
    private String surname;
    private List<Lesson> lessonList;
    public Student (StudentDTO studentDTO){
        this(null, studentDTO.getName(),studentDTO.getSurname(),studentDTO.getLessonList());
    }
}
