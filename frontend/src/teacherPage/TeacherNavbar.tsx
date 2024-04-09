import {Button, Drawer, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import './TeacherNavbar.css';
import {Link, useNavigate} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import profileImage from "../image/profile.jpg";

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
                variant="permanent" className="drawer"
            >
                <div style={{ marginBottom: '60px'}}>
                    <img src={profileImage} alt="Resim Açıklaması" width="120" height="120"/>
                </div>
                <List>
                    <ListItem button component={Link} to="/teacher" >
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Home"/>
                    </ListItem>
                    <ListItem button component={Link} to="/teacher/studentlist">
                        <ListItemIcon>
                            <FormatListNumberedIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Student List"/>
                    </ListItem>
                    <ListItem button component={Link} to="/teacher/homework">
                        <ListItemIcon>
                            <AddHomeWorkIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Homework"/>
                    </ListItem>
                    <ListItem button component={Link} to="/teacher/add-attendance">
                        <ListItemIcon>
                            <AnnouncementIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Announcement"/>
                    </ListItem>
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '60px'}}>
                        <Button sx={{backgroundColor: 'white', color: 'grey'}}
                                onClick={handleLogoutClick}>Logout</Button>
                    </div>
                </List>
            </Drawer>

        </>
)
;
}