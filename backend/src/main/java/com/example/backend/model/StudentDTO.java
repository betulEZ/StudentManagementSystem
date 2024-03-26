package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class StudentDTO {
    private String name;
    private String surname;
    private List<Lesson> lessonList;
}
