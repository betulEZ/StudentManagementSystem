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
import {Button, Dialog, TableCell } from "@mui/material";
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import React from "react";


const studentService = new StudentService();

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
export default function StudentList(){
    const [students, setStudents] = useState<Student[]>([]);
    const [open, setOpen] = React.useState(false);
    const [id, setId] = useState('');
    const currentStudent = students.find(student => student.id === id);
    const [name, setName] = useState(currentStudent ? currentStudent.name : '');
    const [surname, setSurname] = useState(currentStudent ? currentStudent.surname : '');


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
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
                                    <BootstrapDialog
                                        onClose={handleClose}
                                        aria-labelledby="customized-dialog-title"
                                        open={open}
                                    >
                                        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                            Update Student
                                        </DialogTitle>
                                        <IconButton
                                            aria-label="close"
                                            onClick={handleClose}
                                            sx={{
                                                position: 'absolute',
                                                right: 8,
                                                top: 8,
                                                color: (theme) => theme.palette.grey[500],
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                        <DialogContent dividers>
                                            <Typography gutterBottom>
                                                <label>
                                                Name:
                                                <input value={name} type="text"  onChange={changeName} required/>
                                                </label>
                                            </Typography>
                                            <Typography gutterBottom>
                                                <label>
                                                    Surname:
                                                    <input value={surname} type="text" onChange={changeSurname} required/>
                                                </label>
                                            </Typography>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button autoFocus onClick={handleSave}>
                                                Save changes
                                            </Button>
                                        </DialogActions>
                                    </BootstrapDialog>

                                </TableCell>
                                <TableCell  align="center" onClick={() => handleDelete(student.id)}>
                                    <Button variant="outlined">Delete </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
        </>
    );
}