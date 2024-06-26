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
import DeleteIcon from "@mui/icons-material/Delete";

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
    const handleDelete = async (lessonId: string, message: Message) => {
        if (lessonId) {
            await lessonService.deleteMessage(lessonId, message);
            const updatedLessons = deleteMessageFromLessons(lessonId, message);
            setLessons(updatedLessons);
            const response = await lessonService.getAllMessageByLessonId(lessonId);
            setMessages(response.data);
            setDescription('');
        }
    }
    const deleteMessageFromLessons  = (lessonId: string, message: Message) => {
        return lessons.map(lesson => {
            if (lesson.id === lessonId) {
                lesson.messageList = lesson.messageList.filter(a => a !== message);
            }
            return lesson;
        });
    }

    return (
        <>
            <StudentNavbar  studentId={props?.studentId ?? ''} logout={props.logout} setLessons={setLessons}/>
            <Paper sx={{width: 'fit-content', maxWidth: '100%', p: 6, m: 'auto', mt: 15}}>
                <Box sx={{display: 'flex', flexDirection: 'column', width: '600px', height: '700px'}}>
                    <Box sx={{flex: 1, overflowY: 'auto', mx: 1}}>
                        {messages.map((message) => (
                            <Box key={message.message} sx={{display: 'flex', flexDirection: 'column', mb: 1}}>
                                <Box sx={{display: 'flex', alignItems: 'flex-start', justifyContent: message.student.id === props.studentId ? 'flex-end' : 'flex-start'}}>
                                    <Paper sx={{p: 3, maxWidth: '90%', bgcolor: message.student.id === props.studentId ? 'lightgreen' : 'orange'}}>
                                        <Typography variant="body1" sx={{fontSize: '1.2rem'}}>
                                            {message.message}
                                        </Typography>

                                    </Paper>
                                    {message.student.id === props.studentId && (
                                        <IconButton onClick={() => {
                                            if (lessonId) {
                                                handleDelete(lessonId, message);
                                            } else {
                                                console.error("lessonId parametresi belirtilmemiş veya tanımsız");
                                            }
                                        }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
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