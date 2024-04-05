import TeacherNavbar from "./TeacherNavbar.tsx";
import LessonService from "../service/LessonService.ts";
import {useEffect, useState} from "react";
import {Attendance, AttendanceStatus, Lesson} from "../types/Lesson.ts";
import {Box, Card, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import './TeacherHomePage.css';
export type Props = {
    logout():void
};
const lessonService =new LessonService();

export default function TeacherHomePage(props : Readonly<Props>) {
    const [lessons, setLessons] = useState<Lesson[]>([]);

    useEffect(() => {
        lessonService.getAllLessons().then((response) => {
            setLessons(response.data);
        });
    }, []);

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
    const handleDelete = (lessonId: string, attendance: Attendance) => {
        lessonService.deleteAnnouncement(lessonId, attendance)
            .then(() => {
                const updatedLessons = lessons.map(lesson => {
                    if (lesson.id === lessonId) {
                        lesson.attendanceList = lesson.attendanceList.filter(a => a !== attendance);
                    }
                    return lesson;
                });
                setLessons(updatedLessons);
            })
            .catch(error => {
                console.error('Error deleting attendance:', error);
            });
    }

    return (
        <>
            <TeacherNavbar logout={props.logout}/>

            <div className="div-scope">
                <h2>Announcement List</h2>
                {lessons && lessons.length > 0 && lessons.map((lesson, index) => (
                    <div key={index}>

                        {lesson.attendanceList && lesson.attendanceList.length > 0 && lesson.attendanceList.map((attendance, idx) => (
                            <Card key={idx} style={{
                                marginBottom: '10px',
                                width: '600px',
                                backgroundColor: getColorForStatus(attendance.status)
                            }}>
                                <Box className="box-scope">
                                    <CardContent>
                                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                            {lesson.name}
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {attendance.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <IconButton aria-label="delete" color="inherit"   onClick={() => handleDelete(lesson.id,attendance)}>
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