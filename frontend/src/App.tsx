import {Route, Routes} from "react-router-dom";
import TeacherHomePage from "./teacherPage/TeacherHomePage";
import StudentList from "./teacherPage/StudentList.tsx";
import HomeworkList from "./teacherPage/HomeworkList.tsx";

export default function App() {


  return (
    <>
        <TeacherHomePage/>
        <h1>App</h1>
        <Routes>
            <Route path='/teacher' element={<TeacherHomePage/>}/>
            <Route path='/teacher/studentlist' element={<StudentList/>}/>
            <Route path='/teacher/homework' element={<HomeworkList/>}/>

        </Routes>

    </>
  )
}


