import axios from "axios";

export default class HomeworkService {

    getHomeworksById(id: string) {
        return axios.get(`/api/homeworks/${id}`);
    }
}