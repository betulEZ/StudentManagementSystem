package com.example.backend.controller;

import com.example.backend.model.HomeworkDTO;
import com.example.backend.model.Lesson;
import com.example.backend.model.LessonDTO;
import com.example.backend.repository.HomeworkRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@WithMockUser
class HomeworkControllerTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;
    @Test
    void saveNewHomework() throws Exception {
        // GIVEN
        Lesson lesson=new Lesson(null,"Math",null,null,null);
        LocalDate date = LocalDate.of(2024, 5, 2);
        HomeworkDTO requestBody =new HomeworkDTO("Homework Title","Description of the homework",date,lesson);


        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.post("/api/homeworks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestBody)))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").isNotEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("Homework Title"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("Description of the homework"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.deadline").value("2024-05-02"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lesson.name").value("Math"));

    }
}