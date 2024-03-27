package com.example.backend.service;
import com.example.backend.model.Homework;
import com.example.backend.model.HomeworkDTO;
import com.example.backend.repository.HomeworkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HomeworkService {

    private final HomeworkRepository homeworkRepository;

    public Homework saveHomework(HomeworkDTO homeworkDTO) {
        Homework temp=new Homework(null,homeworkDTO.getTitle(),homeworkDTO.getDescription(),homeworkDTO.getDeadline(),homeworkDTO.getLesson());
        return homeworkRepository.save(temp);
    }
}
