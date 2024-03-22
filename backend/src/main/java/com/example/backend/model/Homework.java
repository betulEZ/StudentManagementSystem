package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;
import org.bson.types.Binary;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@With
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "homeworks")
public class Homework {
    private String id;
    private String title;
    private Binary file;

    public Homework(String title) {
        this.title=title;
    }
}
