import axios from "axios";
import {Student} from "../types/Student.ts";

export default class StudentService{
    getAllStudents() {
        return axios.get('/api/students');
    }
    getStudentsById(id: string) {
        return axios.get(`/api/students/${id}`);
    }

    addStudent(student: Student) {
        return axios.post('/api/Students', student);
    }
    updateStudent(id:string, student: Student) {
        return axios.put(`/api/students/${id}`,student);
    }
    deleteStudents(id: string) {
        return axios.delete(`/api/students/${id}`);
    }

}