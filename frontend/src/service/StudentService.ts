import axios from "axios";

export default class StudentService{
    getAllStudents() {
        return axios.get('/api/students');
    }

}