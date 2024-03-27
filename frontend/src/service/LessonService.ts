import axios from "axios";

export default class LessonService {
    getAllLessons() {
        return axios.get('/api/lessons');
    }
    getAllLessonsByStudentId(id : string) {
        return axios.get(`/api/lessons/student/${id}`);
    }

}