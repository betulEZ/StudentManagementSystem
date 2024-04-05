package com.example.backend.service;

import com.example.backend.model.Homework;
import com.example.backend.model.HomeworkDTO;
import com.example.backend.model.Lesson;
import com.example.backend.repository.HomeworkRepository;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class HomeworkServiceTest {
    private final HomeworkRepository homeworkRepository=mock(HomeworkRepository.class);
    private final HomeworkService homeworkService= new HomeworkService(homeworkRepository);

    @Test
    void saveHomework() {
        // GIVEN
        Lesson lesson=new Lesson("Math101","Math",null,null);
        LocalDate date = LocalDate.of(2024, 5, 2);
        Homework expected =new Homework("1","name","description",date,lesson);
        HomeworkDTO homeworkDTO =new HomeworkDTO("name","description",date,lesson);


        // WHEN
        when(homeworkRepository.save(new Homework(homeworkDTO))).thenReturn(expected);
        Homework result=homeworkService.saveHomework(homeworkDTO);

        // THEN
        assertEquals(expected,result);

    }
}