import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import LessonService from "../service/LessonService.ts";
import {AttendanceStatus, Lesson} from "../types/Lesson.ts";
import {useState, useEffect, ChangeEvent, FormEvent} from "react";
import {Homework} from "../types/Homework.ts";
import HomeworkService from "../service/HomeworkService.ts";
import TeacherNavbar from "./TeacherNavbar.tsx";

const lessonService = new LessonService();
const homeworkService = new HomeworkService();

export type Props = {
    logout():void;
}
export default function HomeworkAdd(props : Readonly<Props>) {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [selectedLesson,setSelectedLesson]=useState<Lesson>({   id: '',
        name: '',
        studentList: [],
        attendanceList: [{ description: '', status: AttendanceStatus.LOW }]});
    const [formData, setFormData] = useState<Homework>({
        title: '',
        description: '',
        deadline: new Date(),
        lesson: { id: '',
            name: '',
            studentList: [],
            attendanceList: [{ description: '', status: AttendanceStatus.LOW }] }
    });


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

            setFormData(prevData => ({
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

    const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            title: value,
        }));
    };
    const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            description: value,
        }));
    };
    function handleDeadlineChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            deadline: new Date(value)
        }));
    }
    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await homeworkService.addHomework(formData);
        setFormData({ title: '', description: '', deadline: new Date(),  lesson: { id: '',
                name: '',
                studentList: [],
                attendanceList: [{ description: '', status: AttendanceStatus.LOW }] } } );
    };

    return (
        <>
            <TeacherNavbar logout={props.logout}/>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <form onSubmit={handleOnSubmit}>
                    <FormControl sx={{m: 1, width: 300, display: 'flex', justifyContent: 'center'}}>
                        <InputLabel>Lessons</InputLabel>
                        <Select
                            value={selectedLesson.id}
                            onChange={handleLessonChange}
                            input={<OutlinedInput label="Lessons"/>}
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
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChangeTitle}
                               required/>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChangeDescription}
                            required
                        />
                        <label htmlFor="deadline">Deadline</label>
                        <TextField
                            type="date"
                            value={formData.deadline.toISOString().split('T')[0]} // Format the date as YYYY-MM-DD for input
                            onChange={handleDeadlineChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <button type="submit">Add Homework</button>
                    </FormControl>
                </form>
            </Box>
        </>
);
}