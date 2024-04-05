import {Student} from "./Student.ts";

export type Lesson ={
    id: string;
    name: string;
    studentList: Student[];
    attendanceList : Attendance[];
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