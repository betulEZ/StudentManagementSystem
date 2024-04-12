import TeacherNavbar from "./TeacherNavbar.tsx";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Attendance, AttendanceStatus, Lesson} from "../types/Lesson.ts";
import LessonService from "../service/LessonService.ts";
import MuiAlert from '@mui/material/Alert';

import {
    Box, Button,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Snackbar
} from "@mui/material";
import './AddAnnouncement.css';
const lessonService = new LessonService();

export type Props = {
    logout():void
};
export default function AddAnnouncement(props : Readonly<Props>){
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [selectedLesson, setSelectedLesson] = useState<Lesson>({
        id: '',
        name: '',
        studentList: [],
        attendanceList: [{ description: '', status: AttendanceStatus.LOW }],
        messageList: []
    });
    const [form, setForm] = useState<Attendance>({ description: '', status: AttendanceStatus.LOW });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        lessonService.getAllLessons().then((response) => {
            setLessons(response.data);
        });
    }, []);
    function handleLessonChange(event: SelectChangeEvent<string>) {
        const selectedLessonId = event.target.value as string;
        const selectedLesson = lessons.find(lesson => lesson.id === selectedLessonId);

        if (selectedLesson) {
            console.log(selectedLesson);
            setSelectedLesson(selectedLesson);

            setForm(prevData => ({
                ...prevData,
                lesson: {
                    id: selectedLesson.id,
                    name: selectedLesson.name,
                    studentList: selectedLesson.studentList,
                    attendanceList: selectedLesson.attendanceList
                }
            }));
        }
    }
    const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setForm((prevData) => ({
            ...prevData,
            description: value,
        }));
    };
    const handleChangeAttendanceStatus = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as AttendanceStatus;
        setForm(prevData => ({
            ...prevData,
            status: value,
        }));
    };
    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await lessonService.saveNewAnnouncement(selectedLesson.id,form);
        setForm({ description: '', status: AttendanceStatus.LOW });
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
        <TeacherNavbar logout={props.logout}></TeacherNavbar>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px', padding: '20px' }}>
                <form onSubmit={handleOnSubmit} className="custom-form">
                    <h3>Add Announcement</h3>
                    <br/>
                    <FormControl className="form-style">
                        <InputLabel>Lessons</InputLabel>
                        <Select
                            value={selectedLesson.id}
                            onChange={handleLessonChange}
                            input={<OutlinedInput label="Lessons"/>}
                            sx={{width: '100%', textAlign: 'center'}}
                        >
                            {lessons.map((lesson) => (
                                <MenuItem
                                    key={lesson.id}
                                    value={lesson.id}
                                >
                                    {lesson.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <br/>
                        <label htmlFor="description">Description:</label>
                        <br/>
                        <textarea
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={handleChangeDescription}
                            required
                            className="custom-textarea"
                        />
                        <br/>
                        <label htmlFor="status">Status:</label>
                        <br/>
                        <select value={form.status} onChange={handleChangeAttendanceStatus} className="custom-select">
                            {Object.keys(AttendanceStatus).map((status) => (
                                <option key={status}
                                        value={AttendanceStatus[status as keyof typeof AttendanceStatus]}>{status}</option>
                            ))}
                        </select>
                        <br/>
                        <Button variant="contained" type="submit" className="custom-button">Add Announcement</Button>
                        <Snackbar
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            open={open}
                            autoHideDuration={6000}
                            onClose={handleClose}
                        >
                            <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                Announcement saved successfully!
                            </MuiAlert>
                        </Snackbar>
                    </FormControl>
                </form>
            </Box>

        </>
    );
}