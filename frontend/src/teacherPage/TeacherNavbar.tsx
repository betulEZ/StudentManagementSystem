import {Drawer, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import './TeacherNavbar.css';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
export default function TeacherNavbar(){


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
                        <ListItemText primary="Student List" />
                    </ListItem>
                </List>
            </Drawer>

</>
)
    ;
}