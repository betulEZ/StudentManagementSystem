import {AppBar, Box, Button, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import './StudentNavbar.css';
import {Link} from "react-router-dom";
export default function StudentNavbar(){

    return(
            <Box sx={{ flexGrow: 1}}>
                <AppBar  style={{ backgroundColor: 'darkgrey' }}>
                    <Toolbar>
                        <Typography   className="typography"  variant="h6"
                                    component={Link} to="/student/:studentId"
                        >
                            Lessons
                        </Typography>
                        <Button  color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
    );
}