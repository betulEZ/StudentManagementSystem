import {Route, Routes} from "react-router-dom";
import TeacherHomePage from "./teacherPage/TeacherHomePage";
import StudentList from "./teacherPage/StudentList.tsx";
import HomeworkAdd from "./teacherPage/HomeworkAdd.tsx";
import StudentHomePage from "./studentPage/StudentHomePage.tsx";
import {useState} from "react";

export default function App() {
    const [studentId, setStudentId] = useState<string>("1");
    return (
    <>
        {/* <TeacherHomePage/> */}

        <Routes>
            <Route path='/teacher' element={<TeacherHomePage/>}/>
            <Route path='/teacher/studentlist' element={<StudentList/>}/>
            <Route path='/teacher/homework' element={<HomeworkAdd/>}/>

            <Route path='/student/:studentId' element={<StudentHomePage studentId={studentId}/>}/>

        </Routes>

    </>
  )
}


