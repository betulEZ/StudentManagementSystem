import TeacherNavbar from "./TeacherNavbar.tsx";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Attendance, AttendanceStatus, Lesson} from "../types/Lesson.ts";
import LessonService from "../service/LessonService.ts";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent
} from "@mui/material";

const lessonService = new LessonService();

export type Props = {
    logout():void
};
export default function AddAnnouncement(props: Props){
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [selectedLesson,setSelectedLesson]=useState<Lesson>({   id: '',
        name: '',
        studentList: [],
        attendanceList: [{ description: '', status: AttendanceStatus.LOW }]});
    const [formData, setFormData] = useState<Attendance>({ description: '', status: AttendanceStatus.LOW });

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
    const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            description: value,
        }));
    };
    const handleChangeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as AttendanceStatus;
        setFormData(prevData => ({
            ...prevData,
            status: value,
        }));
    };
    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await lessonService.saveNewAnnouncement(selectedLesson.id,formData);
        setFormData({ description: '', status: AttendanceStatus.LOW });
    }
    return (
        <>
        <TeacherNavbar logout={props.logout}></TeacherNavbar><Box sx={{display: 'flex', justifyContent: 'center'}}>
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
                 <label htmlFor="description">Description:</label>
                 <textarea
                     id="description"
                     name="description"
                     value={formData.description}
                     onChange={handleChangeDescription}
                     required
                 />
                 <label htmlFor="status">Status</label>
                 <select value={formData.status} onChange={handleChangeStatus}>
                     {Object.keys(AttendanceStatus).map((status, index) => (
                         <option key={index}
                                 value={AttendanceStatus[status as keyof typeof AttendanceStatus]}>{status}</option>
                     ))}
                 </select>
                 <button type="submit">Add Announcement</button>
             </FormControl>
         </form>
        </Box>
        </>
    );
}