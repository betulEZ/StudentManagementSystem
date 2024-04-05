package com.example.backend.controller;

import com.example.backend.model.Attendance;
import com.example.backend.model.AttendanceStatus;
import com.example.backend.model.Lesson;
import com.example.backend.model.LessonDTO;
import com.example.backend.repository.LessonRepository;
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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@WithMockUser
class LessonControllerTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void saveNewLesson() throws Exception {
        // GIVEN
        LessonDTO requestBody = new  LessonDTO("Lesson1",null,null);

        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.post("/api/lessons")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestBody)))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").isNotEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Lesson1"));
    }
    @Test
    void getAllLessons() throws Exception {
       // GIVEN
        List<Lesson> lessonList = new ArrayList<>();
        lessonList.add(new Lesson("101", "Math", null,null));

        lessonRepository.saveAll(lessonList);

        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.get("/api/lessons"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value("101"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Math"));
    }
    @Test
    void testGetAllAttendance() throws Exception {
        // GIVEN
        List<Attendance> expectedAttendanceList = Arrays.asList(
                new Attendance("Description1", AttendanceStatus.LOW)
        );
        Lesson lesson = new Lesson("2", "title", null, expectedAttendanceList);
        lessonRepository.save(lesson);

        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.get("/api/lessons/all-attendance")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].description").value("Description1"));
    }

}