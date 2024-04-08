import {Attendance, AttendanceStatus, Lesson} from "../types/Lesson.ts";
import StudentNavbar from "./StudentNavbar.tsx";
import {useEffect, useState} from "react"
import {useParams} from "react-router-dom";
import LessonService from "../service/LessonService.ts";
import {Box, Card, CardContent} from "@mui/material";

export type Props = {
    studentId:string;
    logout():void

}
const lessonService=new LessonService();
export default function Announcement(props: Readonly<Props>){
    const [announcement, setAnnouncement] = useState<Attendance[]>([]);
    const [lessons, setLessons]=useState<Lesson[]>([]);
    const { lessonId } = useParams();

    useEffect(() => {
        async function fetchAnnouncements() {
            try {
                if(lessonId){
                const response = await lessonService.getAllAnnouncementByLessonId(lessonId);
                setAnnouncement(response.data);
                console.log(lessons);
                }
            } catch (error) {
                console.error(`Error fetching announcements for lesson ${lessonId}:`, error);
            }
        }
        fetchAnnouncements();
        return () => {
            setAnnouncement([]); // Clear announcements on unmount
        };
    }, [lessonId]);
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
    return(
        <>
            <StudentNavbar studentId={props?.studentId ?? ''} logout={props.logout} setLessons={setLessons}/>
            <h1>Announcements</h1>
            <div className="div-scope" >
                {announcement.map((item) => (
                    <Card key={item.description} style={{
                        marginBottom: '10px',
                        width: '600px',
                        backgroundColor: getColorForStatus(item.status)
                    }}>
                        <Box className="box-scope" >
                            <CardContent>
                                <h4>{item.description}</h4>
                            </CardContent>
                        </Box>
                    </Card>
                ))}
            </div>
        </>
    );
}