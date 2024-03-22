import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import {Button, Dialog} from "@mui/material";
import React from "react";
import {styled} from "@mui/material/styles";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export type Props = {
    open: boolean;
    handleClose: () => void;
    handleSave: () => void;
    name: string;
    surname: string;
    changeName: (event: React.ChangeEvent<HTMLInputElement>) => void;
    changeSurname: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function UpdateStudent(props: Readonly<Props>){

    return(
        <> <BootstrapDialog
            onClose={props.handleClose}
            aria-labelledby="customized-dialog-title"
            open={props.open}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Update Student
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={props.handleClose}
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
                <Typography gutterBottom>
                    <label htmlFor={"name"} >Name:</label>
                        <input value={props.name} type="text"  onChange={props.changeName} />
                </Typography>
                <Typography gutterBottom>
                    <label htmlFor={"surname"}>Surname:</label>
                        <input value={props.surname} type="text" onChange={props.changeSurname} />
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={props.handleSave}>
                    Save changes
                </Button>
            </DialogActions>
        </BootstrapDialog>
        </>
    )
}