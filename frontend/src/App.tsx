import {Link, Route, Routes, Navigate} from "react-router-dom";
import TeacherHomePage from "./teacherPage/TeacherHomePage";
import StudentList from "./teacherPage/StudentList.tsx";
import HomeworkAdd from "./teacherPage/HomeworkAdd.tsx";
import StudentHomePage from "./studentPage/StudentHomePage.tsx";
import Announcement from "./studentPage/Announcement.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import RegisterPage from "./RegisterPage.tsx";
import LoginPage from "./LoginPage.tsx";
import HomeworkPage from "./studentPage/HomeworkPage.tsx";
import AddAnnouncement from "./teacherPage/AddAnnouncement.tsx";
import './App.css';
type AppUser = {
    id: string,
    username: string,
    email: string,
    avatarUrl: string,
    role: "TEACHER" | "USER",
    studentId?: string
}

export default function App() {
    const [appUser, setAppUser] = useState<AppUser | null | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function fetchMe() {
        setIsLoading(true);
        axios.get("/api/users/me")
            .then((response) => setAppUser(response.data))
            .catch(() => setAppUser(null))
            .finally(() => setIsLoading(false));
    }

    function logout() {
        axios.post("/api/users/logout")
            .then(() => {
                setAppUser(null);
                // Redirect to login page after logout
            })
            .catch(() => console.error("Failed to logout"));
    }

    useEffect(() => {
        fetchMe();
    }, []);

    if (isLoading && appUser === undefined) {
        return <div>Loading...</div>;
    }

    return (
            <Routes>
                <Route path={"/"} element={(
                    <>
                        {appUser ? (
                            <>
                                <div>Welcome back, {appUser.username}</div>
                                <button onClick={logout}>Logout</button>
                                {appUser.role === "TEACHER" ? (
                                    <Navigate to="/teacher" replace />
                                ) : (
                                    <Navigate to={`/student/${appUser.studentId}`} replace />
                                )}
                            </>
                        ) : (
                                <div className="center-container">
                                    <div className="button-container">
                                        <Link to={"/login"} className="button">Login</Link>
                                        <Link to={"/register"} className="button">Register</Link>
                                    </div>
                                </div>
                        )}
                    </>
                )}/>
                <Route path={"/register"} element={<RegisterPage/>}/>
                <Route path={"/login"} element={<LoginPage fetchMe={fetchMe} />} />
                <Route path="/teacher" element={<TeacherHomePage logout={logout}/>} />
                <Route path="/teacher/studentlist" element={<StudentList logout={logout}/>}  />
                <Route path="/teacher/homework" element={<HomeworkAdd logout={logout}/>}  />
                <Route path="/teacher/add-attendance" element={<AddAnnouncement logout={logout}/>}  />
                <Route path={'/student/:studentId'} element={<StudentHomePage studentId={appUser?.studentId ?? ''} logout={logout}/>} />
                <Route path={'/homeworks/:lessonId'} element={<HomeworkPage studentId={appUser?.studentId ?? ''} logout={logout}/>} />
                <Route path={`/student/:studentId/announcement/:lessonId`} element={<Announcement studentId={appUser?.studentId ?? ''} logout={logout}/>} />
            </Routes>

    );
}
