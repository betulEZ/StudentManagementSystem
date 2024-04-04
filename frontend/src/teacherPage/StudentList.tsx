import StudentService from "../service/StudentService.ts";
import {useEffect, useState} from "react";
import {Student} from "../types/Student.ts";
import './StudentList.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, TableCell} from "@mui/material";
import React from "react";
import UpdateStudent from "./UpdateStudent.tsx";
import TeacherNavbar from "./TeacherNavbar.tsx";
import CreateStudent from "./CreateStudent.tsx";


const studentService = new StudentService();
export type Props = {
    logout():void;
}

export default function StudentList(props : Readonly<Props>){
    const [students, setStudents] = useState<Student[]>([]);
    const [open, setOpen] = React.useState(false);
    const [id, setId] = useState('');
    const currentStudent = students.find(student => student.id === id);
    const [name, setName] = useState(currentStudent ? currentStudent.name : '');
    const [surname, setSurname] = useState(currentStudent ? currentStudent.surname : '');
    const [InputVisible, setInputVisible] = useState(false);

    const handleButtonClick = () => {
        setInputVisible(true);
    };

    useEffect(() => {
        studentService.getAllStudents().then((response) => {
            setStudents(response.data);
        });
    }, []);
    const handleDelete = (id: string) => {
        studentService.deleteStudents(id).then(() => {
            // After successful deletion, update the students list
            studentService.getAllStudents().then((response) => {
                setStudents(response.data);
            }).catch(error => {
                console.error('Error fetching students after deletion:', error);
            });
        }).catch(error => {
            console.error('Error deleting student:', error);
        });
    }
    const handleOpen = (id:string) => {
        setOpen(true);
        setId(id);
    };

    function changeName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);

    }
    function changeSurname(event: React.ChangeEvent<HTMLInputElement>) {
        setSurname(event.target.value);
    }
    const handleSave = () => {
        const updatedStudent = students.find(student => student.id === id);

        if (updatedStudent) {
            updatedStudent.name = name;
            updatedStudent.surname = surname;

            studentService.updateStudent(id, updatedStudent).then(() => {
                // After successful deletion, update the students list
                studentService.getAllStudents().then((response) => {
                    setStudents(response.data);
                }).catch(error => {
                    console.error('Error fetching students after deletion:', error);
                });
            }).catch(error => {
                console.error('Error deleting student:', error);
            });

        }
        setOpen(false);
    }
    const handleClose = (): void =>{
        setOpen(false);
    }

    return(
        <>
            <TeacherNavbar logout={props.logout}/>
            <div className="table">
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Name Surname</TableCell>
                                <TableCell align="center">Edit</TableCell>
                                <TableCell align="center">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow
                                    key={student.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {student.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row">{student.name} {student.surname}</TableCell>
                                    <TableCell align="center">
                                        <React.Fragment>
                                            <Button variant="outlined" onClick={() => handleOpen(student.id)}>Edit
                                            </Button>
                                        </React.Fragment>

                                        <UpdateStudent
                                            open={open}
                                            name={name}
                                            surname={surname}
                                            handleClose={handleClose}
                                            handleSave={handleSave}
                                            changeName={changeName}
                                            changeSurname={changeSurname}
                                            logout={props.logout}
                                        />
                                    </TableCell>
                                    <TableCell align="center" onClick={() => handleDelete(student.id)}>
                                        <Button variant="outlined">Delete </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <br/>
                <Button onClick={handleButtonClick} style={{backgroundColor: 'deepskyblue', color: 'white'}}>Create
                    Student</Button>
                <div style={{ marginBottom: '20px' }} /> {}
                <CreateStudent isInputVisible={InputVisible} setStudents={setStudents}/>
            </div>

        </>
    );
}