import {Button, TextField} from "@mui/material";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {AppUser} from "../types/AppUser.ts";
import StudentService from "../service/StudentService.ts";
import {Student} from "../types/Student.ts";
import './CreateStudent.css';
export type Props = {
    isInputVisible: boolean;
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}
const studentService = new StudentService();
export default function CreateStudent(props : Readonly<Props>){
    const [formData, setFormData] = useState<AppUser>({
        name: '',
        surname: '',
        email: '',
        password: '',
        username: ''
    });
    const handleChangeUsername = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            username: value,
        }));
    };
    const handleChangeName = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            name: value,
        }));
    };
    const handleChangeSurname = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            surname: value,
        }));
    };
    const handleChangeEmail = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            email: value,
        }));
    };
    const handleChangePassword = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            password: value,
        }));
    };
    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await studentService.register(formData)
        studentService.getAllStudents().then((response) => {
            props.setStudents(response.data);
        });
        setFormData({
            name: '',
            surname: '',
            email: '',
            password: '',
            username: ''
        });
    };
    return (
        <div className="div-container" >
            <form onSubmit={handleOnSubmit}>
                {
                props.isInputVisible && (
                    <>
                        <div className="textarea">
                            <TextField
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChangeUsername}
                                label="Username"
                                variant="outlined"
                            />
                        </div>
                        <div className="textarea">
                            <TextField
                                id="name"
                                name="username"
                                value={formData.name}
                                onChange={handleChangeName}
                                label="Student Name"
                                variant="outlined"
                            />
                        </div>
                        <div className="textarea">
                            <TextField
                                id="surname"
                                name="surname"
                                value={formData.surname}
                                onChange={handleChangeSurname}
                                label="Student Surname"
                                variant="outlined"
                            />
                        </div>
                        <div className="textarea">
                            <TextField
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChangeEmail}
                                label="Student Email"
                                variant="outlined"
                            />
                        </div>
                        <div className="textarea">
                            <TextField
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChangePassword}
                                label="Student Password"
                                variant="outlined"
                            />
                        </div>
                        <Button variant="contained" type="submit" className="button-design" style={{backgroundColor: 'green'}}>
                            Save
                        </Button>
                    </>
                )
            }
            </form>
        </div>

    );
}