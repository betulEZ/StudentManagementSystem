import {Student} from "./Student.ts";

export type Lesson ={
    id: string;
    name: string;
    studentList: Student[];
    attendanceList : Attendance[];
    messageList : Message[];
}
export type Attendance ={
    description: string;
    status : string;
}
export enum AttendanceStatus{
    LOW="LOW",
    MEDIUM="MEDIUM",
    HIGH="HIGH"
}
export type Message={
    message: string;
    student: Student;
}