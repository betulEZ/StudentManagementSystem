package com.example.backend.service;
import com.example.backend.model.Homework;
import com.example.backend.model.Student;
import com.example.backend.repository.HomeworkRepository;
import lombok.RequiredArgsConstructor;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class HomeworkService {

    private final HomeworkRepository homeworkRepository;

    public Homework saveHomework(Homework homework) {
        return homeworkRepository.save(homework);
    }
}
