import axios from "axios";
import {Attendance} from "../types/Lesson.ts";

export default class LessonService {
    getAllLessons() {
        return axios.get('/api/lessons');
    }
    getAllLessonsByStudentId(id : string) {
        return axios.get(`/api/lessons/student/${id}`);
    }
    saveNewAnnouncement(lessonId : string ,announcement:Attendance) {
        return axios.post(`/api/lessons/save-attendance/${lessonId}`,announcement);
    }
    deleteAnnouncement(lessonId : string ,announcement:Attendance) {
        return axios.delete(`/api/lessons/delete-announcement/${lessonId}`, {
            data: announcement
        });
    }
    getAllAnnouncementByLessonId(lessonId: string){
        return axios.get(`/api/lessons/${lessonId}`);
    }
}