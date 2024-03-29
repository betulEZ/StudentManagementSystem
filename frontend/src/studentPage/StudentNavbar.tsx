import {AppBar, Box, Button, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import './StudentNavbar.css';
import {Link, useNavigate} from "react-router-dom";
export type Props = {
    studentId: string,
    logout() : void
};
export default function StudentNavbar(props : Readonly<Props>){
    const navigate=useNavigate();
    const handleLogoutClick = () => {
        props.logout();
        navigate(`/login`);

    };

    return(
            <Box sx={{ flexGrow: 1}}>
                <AppBar  style={{ backgroundColor: 'darkgrey' }}>
                    <Toolbar >
                        <Typography   className="typography"  variant="h6"
                                    component={Link} to={`/student/${props.studentId}`}
                        >
                            Lessons
                        </Typography>
                        <Button  onClick={handleLogoutClick} color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
    );
}