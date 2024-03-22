package com.example.backend.service;
import com.example.backend.model.Homework;
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

    public String addFile(String title, MultipartFile file) throws IOException {
        Homework fileData = new Homework(title);
        fileData.setFile(
                new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        fileData = homeworkRepository.insert(fileData); return fileData.getId();
    }

    public Homework getFile(String id) {
        return homeworkRepository.findById(id).orElseThrow();
    }

}
