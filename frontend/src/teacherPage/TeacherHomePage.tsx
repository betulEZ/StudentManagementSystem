import TeacherNavbar from "./TeacherNavbar.tsx";
import LessonService from "../service/LessonService.ts";
import {useEffect, useState} from "react";
import {Attendance, AttendanceStatus, Lesson} from "../types/Lesson.ts";
import {Box, Card, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import './TeacherHomePage.css';
import {Student} from "../types/Student.ts";
import StudentService from "../service/StudentService.ts";

export type Props = {
    logout():void
};
const lessonService =new LessonService();
const studentService =new StudentService();
export default function TeacherHomePage(props : Readonly<Props>) {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        lessonService.getAllLessons().then((response) => {
            setLessons(response.data);
        });
    }, []);
    useEffect(() => {
        studentService.getAllStudents().then((response) => {
            setStudents(response.data);
        });
    }, []);
    console.log("lesson.length "+lessons.length);
    console.log("student.length"+ students.length)
    const getColorForStatus = (attendanceStatus: string) => {
        console.log("Attendance status:", attendanceStatus);

        switch (attendanceStatus) {
            case AttendanceStatus.LOW:
                return '#4caf50';
            case AttendanceStatus.HIGH:
                return '#f44336';
            case AttendanceStatus.MEDIUM:
                return '#ff9800';
            default:
                return '#e0e0e0';
        }
    };
    const handleDelete = async (lessonId: string, attendance: Attendance) => {
        await lessonService.deleteAnnouncement(lessonId, attendance);
        const updatedLessons = updateLessons(lessonId, attendance);
        setLessons(updatedLessons);

    }

    const updateLessons = (lessonId: string, attendance: Attendance) => {
        return lessons.map(lesson => {
            if (lesson.id === lessonId) {
                lesson.attendanceList = lesson.attendanceList.filter(a => a !== attendance);
            }
            return lesson;
        });
    }

    return (
        <>
            <TeacherNavbar logout={props.logout}/>

            <div className="div-scope">
                <div className="div-forCard" >
                    <Card className="card-two" sx={{backgroundColor: 'lightgrey', borderRadius: '10px', padding: '20px'}}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                               Total {students.length} Students
                            </Typography>
                        </CardContent>
                    </Card>
                    <div style={{width: '10px'}}></div>
                    {/* Yan yana boşluk */}
                    <Card className="card-two" sx={{backgroundColor: 'lightgrey', borderRadius: '10px', padding: '20px'}}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                               Total {lessons.length} Lessons
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <h2>Announcement List</h2>
                {lessons && lessons.length > 0 && lessons.map((lesson) => (
                    <div key={lesson.id}>
                        {lesson.attendanceList && lesson.attendanceList.length > 0 && lesson.attendanceList.map((attendance) => (
                            <Card key={attendance.description} style={{
                                marginBottom: '10px',
                                width: '600px',
                                backgroundColor: getColorForStatus(attendance.status),
                                borderRadius: '20px'
                            }}>
                                <Box className="box-scope">
                                    <CardContent>
                                        <Typography sx={{fontSize: 16, fontWeight: 'bold', color: '#333'}} gutterBottom>
                                            {lesson.name}
                                        </Typography>
                                        <Typography component="div" style={{fontSize: 14}}>
                                            {attendance.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <IconButton aria-label="delete" color="inherit" onClick={() => {
                                            if (window.confirm('Are you sure?')) {
                                                handleDelete(lesson.id, attendance);
                                            }
                                        }}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </CardActions>
                                </Box>
                            </Card>
                        ))}
                    </div>
                ))}
            </div>

        </>
    );
}