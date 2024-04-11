import StudentNavbar from "./StudentNavbar.tsx";
import LessonService from "../service/LessonService.ts";
import {useEffect, useState} from "react";
import {Attendance, Lesson} from "../types/Lesson.ts";
import {Badge, Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import './StudentHomePage.css';
import HomeworkService from "../service/HomeworkService.ts";
import {Homework} from "../types/Homework.ts";
import './HomeworkPage.css';
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import AnnouncementIcon from '@mui/icons-material/Announcement';
import CampaignIcon from '@mui/icons-material/Campaign';

export type Props = {
    studentId: string,
    logout():void
};
const lessonService=new LessonService();
const homeworkService=new HomeworkService();
export default function StudentHomePage(props : Readonly<Props>){
    const [lessons, setLessons]=useState<Lesson[]>([]);
    const [homework, setHomeworks] = useState<Homework[]>([]);
    const [homeworkCounts, setHomeworkCounts] = useState<{ [key: string]: number }>({});
    const [announcement,setAnnouncement]=useState<Attendance[]>([])
    const [announcementCounts, setAnnouncementCounts] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        lessonService.getAllLessonsByStudentId(props.studentId).then((response) => {
            setLessons(response.data);
        });
    }, [props.studentId]);

    useEffect(() => {
        const fetchHomeworks = async (lesson: Lesson) => {
            try {
                const response = await homeworkService.getHomeworkByLessonId(lesson.id);
                setHomeworks((prevHomeworks) => [...prevHomeworks, ...response.data]);
                setHomeworkCounts((prevCounts) => ({
                    ...prevCounts,
                    [lesson.id]: response.data.length
                }));
            } catch (error) {
                console.error(`Error fetching homework for lesson ${lesson.id}:`, error);
            }
        };

        lessons.forEach((lesson) => {
            fetchHomeworks(lesson);
        });
    }, [lessons]);

    async function handleLessonDelete(lesson: Lesson) {
        try {
        if(lesson){
            const response = await axios.delete(`/api/students/${props.studentId}/delete-lesson`, { data: lesson });
            console.log('Lesson deleted successfully:', response.data,announcement);
            const updatedLessons = lessons.filter(item => item.id !== lesson.id);
            setLessons(updatedLessons);
        }
        } catch (error) {
            console.error('Error while deleting lesson:', error);
        }
    }
    console.log(homework);

    async function handleGetAllAnnouncement(lessonId: string) {
            const response = await lessonService.getAllAnnouncementByLessonId(lessonId);
            setAnnouncement((prevAnnouncements) => [...prevAnnouncements, ...response.data]);
            setAnnouncementCounts((prevCounts) => ({
                ...prevCounts,
                [lessonId]: response.data.length
            }));
    }
    useEffect(() => {
        lessons.forEach((lesson) => {
            handleGetAllAnnouncement(lesson.id);
        });
    }, [lessons]);

    return(
        <>
            <StudentNavbar studentId={props?.studentId ?? ''} logout={props.logout}  setLessons={setLessons}/>
            <div style={{textAlign: 'center'}}>
                <h1>STUDENT</h1>
                <div className="lesson-container">
                    {lessons.map((lesson) => (
                        <Card key={lesson.id} className="card" sx={{backgroundColor: '#f0f0f0'}}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {lesson.name}
                                </Typography>
                            </CardContent>
                            <div className="card-container">
                                <div>
                                    <DeleteIcon style={{color: 'red'}} onClick={() => {
                                        if (window.confirm('Are you sure?')) {
                                            handleLessonDelete(lesson);
                                        }
                                    }}/>
                                </div>
                                <div>
                                    <Link to={`/student/${props.studentId}/message/${lesson.id}`}>
                                            <AnnouncementIcon color="action"/>
                                    </Link>
                                </div>
                                <div>
                                    <Link to={`/student/${props.studentId}/announcement/${lesson.id}`}>
                                        <Badge badgeContent={announcementCounts[lesson?.id] || 0} color="primary">
                                            <CampaignIcon color="action"/>
                                        </Badge>
                                    </Link>
                                </div>
                                <div>
                                    <Link to={`/homeworks/${lesson.id}`}>
                                        <Badge badgeContent={homeworkCounts[lesson?.id] || 0} color="primary">
                                            <AddHomeWorkIcon color="action"/>
                                        </Badge>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}