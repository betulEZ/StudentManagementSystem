import StudentNavbar from "./StudentNavbar.tsx";
import LessonService from "../service/LessonService.ts";
import {useEffect, useState} from "react";
import {Lesson} from "../types/Lesson.ts";
import {Button, Card, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import './StudentHomePage.css';
export type Props = {
    studentId: string
};
const lessonService=new LessonService();
export default function StudentHomePage(props : Readonly<Props> ){
    const [lessons, setLessons]=useState<Lesson[]>([]);

    useEffect(() => {
        lessonService.getAllLessonsByStudentId(props.studentId).then((response) => {
            setLessons(response.data);
        });
    }, []);

    return(
        <>
            <StudentNavbar/>
            <div style={{textAlign: 'center'}}>
                <h1>STUDENT</h1>
                <div className="lesson-container">
                    {lessons.map((lesson, index) => (
                        <Card key={index} className="card"  sx={{ backgroundColor: '#f0f0f0' }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {lesson.name}
                                </Typography>

                            </CardContent>
                            <CardActions style={{ justifyContent: 'flex-end' }}>
                                <Button>Detail</Button>
                            </CardActions>
                        </Card>
                    ))}

                </div>
            </div>
        </>
    );
}