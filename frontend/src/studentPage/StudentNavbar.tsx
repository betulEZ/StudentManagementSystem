import {
    AppBar,
    Box,
    Button,
    SelectChangeEvent,
    Toolbar
} from "@mui/material";
import Typography from "@mui/material/Typography";
import './StudentNavbar.css';
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Lesson} from "../types/Lesson.ts";
import axios from "axios";
import LessonService from "../service/LessonService.ts";
import AddLesson from "./AddLesson.tsx";


export type Props = {
    studentId: string,
    logout() : void,
    setLessons: React.Dispatch<React.SetStateAction<Lesson[]>>;
};
const lessonService=new LessonService();
export default function StudentNavbar(props : Readonly<Props>, ){
    const navigate=useNavigate();
    const [selectedLesson,setSelectedLesson]=useState<Lesson>({id: '', name: '' ,studentList:[]});
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [formData, setFormData] = useState<Lesson>({id: '', name: '' ,studentList:[] });


    useEffect(() => {
        lessonService.getAllLessons().then((response) => {
            setLessons(response.data);
        });

    }, []);


    const [open, setOpen] = React.useState(false);
    const handleLogoutClick = () => {
        props.logout();
        navigate(`/login`);

    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    function changeLesson(event: SelectChangeEvent) {
        const selectedLessonId = event.target.value ;
        console.log('Selected Lesson ID:', selectedLessonId);

        const newLesson = lessons.find(lesson => lesson.id === selectedLessonId);

        setSelectedLesson(newLesson as Lesson);

        if (newLesson) {
            setFormData({
                ...newLesson,
                id: newLesson.id,
            });
        }
    }
    const handleUpdate = async () => {
        try {
            const response = await axios.put(`/api/students/${props.studentId}/add-lesson`, formData);
            props.setLessons(response.data.lessonList);
            console.log('Lesson added successfully:', response.data);
            setOpen(false);
        } catch (error) {
            console.error('Error while adding lesson:', error);
            setOpen(false);
            throw error;
        }

    };
    function handleCloseWindow() {
        setOpen(false);
    }

    return(
            <Box sx={{ flexGrow:  1}}>
                <AppBar  style={{ backgroundColor: 'darkgrey' }}>
                    <Toolbar >
                        <Typography   className="typography"  variant="h6"
                                    component={Link} to={`/student/${props.studentId}`}
                        >
                            Lessons
                        </Typography>
                        <React.Fragment>
                            <Button variant="outlined" onClick={handleClickOpen}>
                               Add Lesson
                            </Button>

                        </React.Fragment>
                       <AddLesson
                           open={open}
                           handleCloseWindow={handleCloseWindow}
                           selectedLesson={selectedLesson}
                           changeLesson={changeLesson}
                           handleUpdate={handleUpdate}
                           lessons={lessons}
                       />

                        <Button  onClick={handleLogoutClick} color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
    );
}