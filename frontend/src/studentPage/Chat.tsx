import StudentNavbar from "./StudentNavbar.tsx";
import React, {FormEvent, useEffect, useState} from "react";
import {Lesson, Message} from "../types/Lesson.ts";
import {useParams} from "react-router-dom";
import LessonService from "../service/LessonService.ts";
import {Box, TextField} from "@mui/material";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SendIcon from '@mui/icons-material/Send';
import Typography from "@mui/material/Typography";
import StudentService from "../service/StudentService.ts";
import {Student} from "../types/Student.ts";

export type Props = {
    studentId: string,
    logout():void
};

const lessonService =new LessonService();
const studentService=new StudentService();
export default function Chat(props: Readonly<Props>){
    const [messages, setMessages]=useState<Message[]>([]);
    const [lessons, setLessons]=useState<Lesson[]>([]);
    const {lessonId } = useParams();
    const [description, setDescription] = useState('');

    function handleChangeDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setDescription(event.target.value);
    }
    useEffect(() => {
        async function fetchMessages() {
            try {
                if (lessonId) {
                    const response = await lessonService.getAllMessageByLessonId(lessonId);
                    setMessages(response.data);
                    console.log(lessons)
                }
            } catch (error) {
                console.error(`Error fetching messages for lesson ${lessonId}:`, error);
            }
        }
        fetchMessages();
        return () => {
            setMessages([]);
        };
    }, [lessonId]);
    const handleSaveMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const studentResponse = await studentService.getStudentsById(props.studentId);
        const student: Student = studentResponse.data;
        try {
            if (lessonId) {
            await lessonService.saveNewMessage(lessonId, {message:description , student});
            const response = await lessonService.getAllMessageByLessonId(lessonId);
            setMessages(response.data);
            setDescription('');
        }
        } catch (error) {
            console.error("Error while saving or fetching messages:", error);
        }
    }

    return (
        <>
            <StudentNavbar  studentId={props?.studentId ?? ''} logout={props.logout} setLessons={setLessons}/>
            <Paper sx={{width: 'fit-content', maxWidth: '100%', p: 6, m: 'auto', mt: 15}}>
                <Box sx={{display: 'flex', flexDirection: 'column', width: '600px', height: '700px'}}>
                    <Box sx={{flex: 1, overflowY: 'auto', mx: 1}}>
                        {messages.map((message, index) => (
                            <Box key={index} sx={{display: 'flex', flexDirection: 'column', mb: 1}}>
                                <Box sx={{display: 'flex', alignItems: 'flex-start', justifyContent: message.student.id === props.studentId ? 'flex-end' : 'flex-start'}}>
                                    <Paper sx={{p: 3, maxWidth: '90%', bgcolor: message.student.id === props.studentId ? 'lightgreen' : 'orange'}}>
                                        <Typography variant="body1" sx={{fontSize: '1.2rem'}}>
                                            {message.message}
                                        </Typography>
                                    </Paper>
                                </Box>
                                <Typography variant="body2" sx={{fontSize: '0.8rem', textAlign: message.student.id === props.studentId ? 'right' : 'left', color: 'gray'}}>
                                    {message.student.name}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                    <Box sx={{display: 'flex', mt: 2, mx: 1}}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="medium"
                            placeholder="Type your message..."
                            sx={{fontSize: '1.2rem'}}
                            value={description}
                            onChange={handleChangeDescription}
                        />
                        <form onSubmit={handleSaveMessage}>
                            <IconButton type="submit" color="primary" size="medium">
                                <SendIcon fontSize="large"/>
                            </IconButton>
                        </form>
                    </Box>
                </Box>
            </Paper>
        </>
    );
}