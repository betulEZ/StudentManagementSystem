import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import {Button, Dialog, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";

import {styled} from "@mui/material/styles";
import {Lesson} from "../types/Lesson.ts";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        width: '500px',
    },
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
export type Props = {
    open:boolean;
    handleCloseWindow: () => void;
    selectedLesson : Lesson;
    changeLesson: (event: SelectChangeEvent) => void;
    handleUpdate: () => Promise<void>;
    lessons: Lesson[];
}
export default function AddLesson(props: Readonly<Props>){


    return(
        <>
            <BootstrapDialog
                onClose={props.handleCloseWindow}
                aria-labelledby="customized-dialog-title"
                open={props.open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Modal title
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={props.handleCloseWindow}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Select
                       value={props.selectedLesson.id}
                        onChange={props.changeLesson}
                    >
                        {props.lessons.map((lesson) => (
                            <MenuItem
                                key={lesson.id}
                                value={lesson.id}
                            >
                                {lesson.name}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={props.handleUpdate}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>

        </>
    );
}