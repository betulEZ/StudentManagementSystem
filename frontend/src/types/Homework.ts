import {Lesson} from "./Lesson.ts";

export type Homework = {
    id?: string;
    title: string;
    description: string;
    deadline: Date;
    lesson: Lesson;
}