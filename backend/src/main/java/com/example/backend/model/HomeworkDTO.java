package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class HomeworkDTO {
    private String title;
    private String description;
    private LocalDate deadline;
    private Lesson lesson;
}
