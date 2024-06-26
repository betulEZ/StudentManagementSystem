package com.example.backend.service;

import com.example.backend.exception.StudentNotFoundException;
import com.example.backend.model.*;
import com.example.backend.repository.LessonRepository;
import com.example.backend.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class LessonService {
    private final LessonRepository lessonRepository;
    private final StudentRepository studentRepository;

    public List<Lesson> getAllLessons() {
       return lessonRepository.findAll();
    }

    public Lesson saveLesson(LessonDTO lessonDTO) {
        Lesson temp=new Lesson(null,lessonDTO.getName(),lessonDTO.getStudentList(), lessonDTO.getAttendanceList(),lessonDTO.getMessageList());
        return lessonRepository.save(temp);
    }

    public List<Lesson> getAllLessonsByStudentId(String studentId) throws StudentNotFoundException {
        Optional<Student> studentOptional = studentRepository.findById(studentId);
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            return new ArrayList<>(student.getLessonList());
        } else {
            throw new StudentNotFoundException("Student not found with id: " + studentId);
        }
    }

    public List<AttendanceDTO> getAllAttendance() {
        List<AttendanceDTO> allAttendance = new ArrayList<>();
        List<Lesson> allLessons = lessonRepository.findAll();

        for (Lesson lesson : allLessons) {
            allAttendance.addAll(lesson.getAttendanceList());
        }
        return allAttendance;
    }

    public AttendanceDTO saveAttendance(String lessonId, AttendanceDTO attendance) {
        Lesson lesson=lessonRepository.findById(lessonId).orElseThrow();

        if (lesson.getAttendanceList() == null) {
            lesson.setAttendanceList(new ArrayList<>());
        }
        List<AttendanceDTO> attendanceList = lesson.getAttendanceList();
        attendanceList.add(attendance);
        lesson.setAttendanceList(attendanceList);
        lessonRepository.save(lesson);

        return attendance;
    }

    public void deleteAttendance(String lessonId, AttendanceDTO attendance) {
        Optional<Lesson> optionalLesson = lessonRepository.findById(lessonId);
        if (optionalLesson.isPresent()) {
            Lesson lesson = optionalLesson.get();
            lesson.getAttendanceList().removeIf(a -> a.equals(attendance));
            lessonRepository.save(lesson);
        }
    }

    public List<AttendanceDTO> getAllAnnouncementByLessonId(String lessonId) {

        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow();

        return lesson.getAttendanceList().stream()
                .map(attendance -> new AttendanceDTO(attendance.getDescription(), attendance.getStatus()))
                .toList();
    }

    public MessageDTO saveMessage(String lessonId, MessageDTO messageDTO) {
        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow();

        if (lesson.getMessageList() == null) {
            lesson.setMessageList(new ArrayList<>());
        }

        MessageDTO message = new MessageDTO();
        message.setMessage(messageDTO.getMessage());
        message.setStudent(messageDTO.getStudent());

        lesson.getMessageList().add(message);
        lessonRepository.save(lesson);
        return messageDTO;
    }

    public List<MessageDTO> getAllMessages(String lessonId) {
        List<MessageDTO> allMessages = new ArrayList<>();
        Optional<Lesson> optionalLesson = lessonRepository.findById(lessonId);
        if (optionalLesson.isPresent()) {
            Lesson lesson = optionalLesson.get();
            if (lesson.getMessageList() != null) {
                allMessages.addAll(lesson.getMessageList());
            }
        }
        return allMessages;
    }

    public void deleteMessage(String lessonId, MessageDTO messageDTO) {
        Optional<Lesson> optionalLesson = lessonRepository.findById(lessonId);
        if (optionalLesson.isPresent()) {
            Lesson lesson = optionalLesson.get();
            List<MessageDTO> messageList = lesson.getMessageList();
            messageList.removeIf(a -> a.equals(messageDTO));
            lesson.setMessageList(messageList);
            lessonRepository.save(lesson);
        }
    }

}
