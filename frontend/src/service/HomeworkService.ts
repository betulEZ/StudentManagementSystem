import axios from "axios";
import {Homework} from "../types/Homework.ts";

export default class HomeworkService {
    addHomework(homework: Homework) {
        return axios.post('/api/homeworks', homework);
    }
    getHomeworkByLessonId(lessonId: string) {
        return axios.get(`/api/homeworks/${lessonId}`);
    }
}