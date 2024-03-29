package com.example.backend.repository;

import com.example.backend.model.Homework;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HomeworkRepository  extends MongoRepository<Homework, String> {
    List<Homework> findByLessonId(String lessonId);
}
