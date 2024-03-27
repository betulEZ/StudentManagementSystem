package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@With
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "homeworks")
public class Homework {
    private String id;
    private String title;
    private String description;
    private LocalDate deadline;
    private Lesson lesson;
    public Homework (HomeworkDTO homeworkDTO){
        this(null, homeworkDTO.getTitle(), homeworkDTO.getDescription(),homeworkDTO.getDeadline(),homeworkDTO.getLesson());
    }
}
