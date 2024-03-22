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

    private final HomeworkRepository photoRepo;

    public String addPhoto(String title, MultipartFile file) throws IOException {
        Homework photo = new Homework(title);
        photo.setImage(
                new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        photo = photoRepo.insert(photo); return photo.getId();
    }

    public Homework getPhoto(String id) {
        return photoRepo.findById(id).orElseThrow();
    }

}
