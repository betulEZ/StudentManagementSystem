package com.example.backend.controller;

import com.example.backend.repository.HomeworkRepository;
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

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@WithMockUser
class HomeworkControllerTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private HomeworkRepository homeworkRepository;

    @Test
    void saveNewHomework() throws Exception {
        // GIVEN
        String requestBody = """
                    {
                       "title": "Homework Title",
                       "description": "Description of the homework",
                       "deadline": "2024-04-01",
                       "lesson": {
                         "name": "Math"
                       }
                     }
                     
                """;

        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.post("/api/homeworks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").isNotEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("Homework Title"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("Description of the homework"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.deadline").value("2024-04-01"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lesson.name").value("Math"));

    }
}