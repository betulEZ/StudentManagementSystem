package com.example.backend.service;

import com.example.backend.model.*;
import com.example.backend.repository.LessonRepository;
import com.example.backend.repository.StudentRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class LessonServiceTest {
    private final LessonRepository lessonRepository = mock(LessonRepository.class);
    private final StudentRepository studentRepository = mock(StudentRepository.class);
    private final LessonService lessonService = new LessonService(lessonRepository, studentRepository);

    @Test
    void getAllLessons() {
        // GIVEN
        List<Student> studentList=new ArrayList<>();
        studentList.add(new Student("1","name","surname",null));
        Lesson lessonList = new Lesson("101", "Math", studentList,null);
        List<Lesson> expected=List.of(lessonList);

        // WHEN
        when(lessonRepository.findAll()).thenReturn(expected);
        List<Lesson> actual=lessonService.getAllLessons();

        // THEN
        assertEquals(expected,actual);
        verify(lessonRepository).findAll();
        verifyNoMoreInteractions(lessonRepository);

    }

    @Test
    void saveLesson() {
        // GIVEN
        List<Student> studentList=new ArrayList<>();
        studentList.add(new Student("1","name","surname",null));
        Lesson expected=new Lesson("Math101","Math",studentList,null);
        LessonDTO lessonDTO=new LessonDTO("Math",studentList,null);

        // WHEN
        when(lessonRepository.save(new Lesson(lessonDTO))).thenReturn(expected);
        Lesson result=lessonService.saveLesson(lessonDTO);

        // THEN
        assertEquals(expected,result);
    }
    @Test
    void testGetAllLessonsByStudentId() throws Exception {
        // GIVEN
        String studentId = "1";
        Student student = new Student();
        student.setId(studentId);
        List<Lesson> lessonList = Arrays.asList(
                new Lesson(null,"Math",null,null),
                new Lesson(null,"Science",null,null)
        );
        student.setLessonList(lessonList);

        // WHEN
        when(studentRepository.findById(studentId)).thenReturn(Optional.of(student));
        List<Lesson> result = lessonService.getAllLessonsByStudentId(studentId);

        // THEN
        assertEquals(lessonList, result);
    }
    @Test
    void testSaveAttendanceByLessonId() {
        // GIVEN
        String lessonId = "1";
        AttendanceDTO attendance = new AttendanceDTO();
        attendance.setDescription("Attendance description");
        attendance.setStatus(AttendanceStatus.LOW);
        Lesson expectedLesson = new Lesson();
        expectedLesson.setId(lessonId);
        expectedLesson.setAttendanceList(new ArrayList<>());
        expectedLesson.getAttendanceList().add(attendance);

        // WHEN
        when(lessonRepository.findById(lessonId)).thenReturn(Optional.of(expectedLesson));
        when(lessonRepository.save(expectedLesson)).thenReturn(expectedLesson);

        AttendanceDTO savedAttendance = lessonService.saveAttendance(lessonId, attendance);

        // THEN
        assertNotNull(savedAttendance);
        assertEquals(attendance.getDescription(), savedAttendance.getDescription());
        assertEquals(attendance.getStatus(), savedAttendance.getStatus());
    }

    @Test
    void testDeleteAttendance() {
        // GIVEN
        String lessonId = "1";
        AttendanceStatus status = AttendanceStatus.LOW;
        AttendanceDTO attendanceToRemove = new AttendanceDTO("description", status);
        List<AttendanceDTO> attendanceList = new ArrayList<>();
        attendanceList.add(attendanceToRemove);
        Lesson lesson = new Lesson();
        lesson.setId(lessonId);
        lesson.setAttendanceList(attendanceList);

        // WHEN
        when(lessonRepository.findById(anyString())).thenReturn(Optional.of(lesson));
        lessonService.deleteAttendance(lessonId, attendanceToRemove);

        // THEN
        assertTrue(lesson.getAttendanceList().isEmpty());

        verify(lessonRepository).save(lesson);
    }
    @Test
    void testGetAllAnnouncementByLessonId() {
        // GIVEN
        String lessonId = "lesson123";
        Lesson lesson = new Lesson();
        lesson.setId(lessonId);
        AttendanceDTO attendance1 = new AttendanceDTO("description1", AttendanceStatus.LOW);
        AttendanceDTO attendance2 = new AttendanceDTO("description2", AttendanceStatus.HIGH);
        lesson.setAttendanceList(Arrays.asList(attendance1, attendance2));

        // WHEN
        when(lessonRepository.findById(lessonId)).thenReturn(java.util.Optional.of(lesson));

        List<AttendanceDTO> result = lessonService.getAllAnnouncementByLessonId(lessonId);

        // THEN
        assertEquals(2, result.size());
        assertEquals("description1", result.get(0).getDescription());
        assertEquals(AttendanceStatus.LOW, result.get(0).getStatus());
        assertEquals("description2", result.get(1).getDescription());
        assertEquals( AttendanceStatus.HIGH, result.get(1).getStatus());
    }
}