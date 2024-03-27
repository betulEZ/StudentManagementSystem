package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class LessonDTO {
    private String name;
    List<Student> studentList;
}
