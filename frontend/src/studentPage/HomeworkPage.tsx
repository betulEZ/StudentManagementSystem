import HomeworkService from "../service/HomeworkService.ts";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Homework} from "../types/Homework.ts";
import StudentNavbar from "./StudentNavbar.tsx";
import {Lesson} from "../types/Lesson.ts";
import './HomeworkPage.css';
const homeworkService=new HomeworkService();
export type Props = {
    studentId: string,
    logout():void
};
export default function HomeworkPage(props : Readonly<Props>){
    const [homeworks, setHomeworks] = useState<Homework[]>([]);
    const [lessons, setLessons]=useState<Lesson[]>([]);
    const { lessonId } = useParams();

    useEffect(() => {
        if (lessonId != null) {
            homeworkService.getHomeworkByLessonId(lessonId)
                .then((response) => {
                    setHomeworks(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching homework:', error);
                });
        }
    }, [lessonId]);
    console.log(lessons);
    return (
        <>
            <StudentNavbar  studentId={props?.studentId ?? ''} logout={props.logout} setLessons={setLessons}/>
            <div className="container">
                <br/>
                <br/>
                <br/>
                <h1>Homework List</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Deadline</th>
                    </tr>
                    </thead>
                    <tbody>
                    {homeworks.map((hw) => (
                        <tr key={hw.id}>
                            <td>{hw.title}</td>
                            <td>{hw.description}</td>
                            <td>{new Date(hw.deadline).toLocaleDateString('tr-TR')}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>

    );
}