import TeacherNavbar from "./TeacherNavbar.tsx";
export type Props = {
    logout():void
};
export default function TeacherHomePage(props : Readonly<Props>){

    return(
        <>
            <TeacherNavbar logout={props.logout}/>

        </>
    );
}