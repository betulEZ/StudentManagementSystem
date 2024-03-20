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
import {Button, TableCell } from "@mui/material";

const studentService = new StudentService();

export default function StudentList(){
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        studentService.getAllStudents().then((response) => {
            setStudents(response.data);
        });
    }, []);


    return(
        <>
            <div className="table">
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name Surname</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Edit</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow
                                key={student.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {student.name} {student.surname}
                                </TableCell>
                                <TableCell align="right">{student.name}</TableCell>
                                <TableCell align="right"> <Button>Edit </Button></TableCell>
                                <TableCell align="right"><Button>Delete </Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
        </>
    );
}