package com.example.backend.controller;

import com.example.backend.model.Lesson;
import com.example.backend.model.LessonDTO;
import com.example.backend.model.Student;
import com.example.backend.model.StudentDTO;
import com.example.backend.repository.StudentRepository;
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
import java.util.Collections;
import java.util.List;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@WithMockUser
class StudentControllerTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ObjectMapper objectMapper;
    @Test
    void saveNewStudent() throws Exception {
        // GIVEN
        StudentDTO requestBody =new StudentDTO("Name","Surname",null);

        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.post("/api/students")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestBody)))
                .andExpect(status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").isNotEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Name"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.surname").value("Surname"));
    }

    @Test
    void getStudentById() throws Exception {
        // GIVEN
        List<Lesson> lessonList = new ArrayList<>();
        lessonList.add(new Lesson("101", "Math",null,null,null));

        Student student = new Student("1", "name", "surname", lessonList);
        studentRepository.save(student);

        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.get("/api/students/1"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value("1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("name"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.surname").value("surname"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lessonList[0].id").value("101"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lessonList[0].name").value("Math"));
    }

    @Test
    void getAllStudents() throws Exception {
        // GIVEN
        List<Lesson> lessonList = new ArrayList<>();
        lessonList.add(new Lesson("101", "Math", null,null,null));

        Student student = new Student("1", "name", "surname", lessonList);
        studentRepository.save(student);

        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.get("/api/students"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value("1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("name"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].surname").value("surname"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].lessonList[0].id").value("101"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].lessonList[0].name").value("Math"));
    }



    @Test
    void updateStudent() throws Exception {
        // GIVEN
        List<Lesson> lessonList = new ArrayList<>();
        lessonList.add(new Lesson("101", "Math", null,null,null));

        Student student = new Student("1", "name", "surname", lessonList);
        studentRepository.save(student);

        // WHEN & THEN
        mvc.perform(put("/api/students/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                    {
                        "name": "test-name",
                         "surname": "surname",
                        "lessonList": []
                    }
                    """))
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    {
                        "id": "1",
                        "name": "test-name",
                        "surname": "surname",
                        "lessonList": [] 
                    }
                    """));
    }


    @Test
    void deleteStudentById() throws Exception {
        //GIVEN
        //WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.delete("/api/students/1"))
                .andExpect(status().isOk())
                .andReturn();
    }

}