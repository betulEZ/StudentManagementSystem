import {Button, Drawer, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import './TeacherNavbar.css';
import {Link, useNavigate} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
export type Props = {
    logout():void
};
export default function TeacherNavbar(props : Readonly<Props>){
    const navigate=useNavigate();
    const handleLogoutClick = () => {
        props.logout();
        navigate(`/login`);

    };

    return(
        <>
            <Drawer
                variant="permanent"  className="drawer"
            >
                <List>
                    <ListItem button component={Link} to="/teacher">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button component={Link} to="/teacher/studentlist">
                        <ListItemIcon>
                            <FormatListNumberedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Student List"/>
                    </ListItem>
                    <ListItem button component={Link} to="/teacher/homework">
                        <ListItemIcon>
                            <AddHomeWorkIcon />
                        </ListItemIcon>
                        <ListItemText primary="Homework"/>
                    </ListItem>
                    <Button onClick={handleLogoutClick}>Logout</Button>
                </List>
            </Drawer>

</>
)
    ;
}