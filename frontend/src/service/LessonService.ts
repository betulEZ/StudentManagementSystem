import axios from "axios";

export default class LessonService {
    getAllLessons() {
        return axios.get('/api/lessons');
    }
}