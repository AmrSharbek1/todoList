import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { useContext } from 'react';
import { TodoContext } from '../contexts/todoContext';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
// ICONS
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import DoneIcon from '@mui/icons-material/Done';
export default function ToDo({ todo, DialogDelete }) {
    const { todoArr, SetToDoArr } = useContext(TodoContext);
    //=====================//
    //start funtion Completed
    const handleCheckClick = () => {
        const updatedToDos = todoArr.map((t) => {
            if (t.id === todo.id) {
                return { ...t, isCompleted: !t.isCompleted }
            }
            return t;
        })
        SetToDoArr(updatedToDos);
        localStorage.setItem("todos", JSON.stringify(updatedToDos));
    }
    //end funtion Completed
    //=====================//
    // The status of deletion

    //=====================//
    // The status of the UPDATE
    const [showUpdateDialog, setShowUpdateDialog] = React.useState(false);
    const [updateToDo, setUpdateToDo] = React.useState({ title: todo.title, details: todo.details });
    //=====================//
    //#####################//
    //=====================//
    const handleDeleteClick = () => {
        DialogDelete(todo);
    };
    //=====================//
    //#####################//
    //=====================//
    // start function   UPDATE
    const handleUpdateDailogClose = () => {
        setShowUpdateDialog(false);
    }
    const handleUpdateDailogOpen = () => {
        setShowUpdateDialog(true);
    }
    const handleCloseAndUpdate = () => {
        const update = todoArr.map((t) => {
            if (t.id == todo.id) {
                return { ...t, title: updateToDo.title, details: updateToDo.details }
            } else {
                return t;
            }
        })
        SetToDoArr(update);
        localStorage.setItem("todos", JSON.stringify(update));
        setShowUpdateDialog(false);
    }
    // end function UPDATE
    //=====================//
    return (
        <>

            {/*#####################*/}
            {/* UPDATE MODAL  */}
            <Dialog
                open={showUpdateDialog}
                onClose={handleUpdateDailogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ textDecoration: "rtl" }}>
                    تعديل المهمة
                </DialogTitle>
                <DialogContent sx={{ textAlign: "right", pr: 3.5 }}>
                    <TextField
                        autoFocus
                        label="عنوان المهمة"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={updateToDo.title}
                        onChange={(e) => {
                            setUpdateToDo({ ...updateToDo, title: e.target.value });
                        }}
                    />
                    <TextField
                        label="التفاصيل"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={updateToDo.details}
                        onChange={(e) => {
                            setUpdateToDo({ ...updateToDo, details: e.target.value });
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAndUpdate} sx={{ color: "red" }}>تحديث</Button>
                    <Button onClick={handleUpdateDailogClose} autoFocus>
                        اغلاق
                    </Button>
                </DialogActions>
            </Dialog>
            {/*===UPDATE MODAL===*/}
            <Card className="card" sx={{ minWidth: 275, textAlign: "center", color: "white", mt: 2, backgroundColor: "#283583" }}>
                <CardContent  >
                    <Grid container spacing={2} sx={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Grid size={8} >
                            <Box sx={{ textAlign: "right" }}>
                                <Typography variant='h5' sx={{ textDecoration: todo.isCompleted ? "line-through" : "", color: todo.isCompleted ? "#575960ff" : "white" }} >{todo.title}</Typography>
                                <Typography variant="h6" sx={{ fontWeight: "200" }} >{todo.details}</Typography>
                            </Box>
                        </Grid>
                        <Grid size={4} display="flex" justifyContent="space-around" alignItems="center"    >
                            <IconButton onClick={handleCheckClick} className='iconButton' sx={{ color: todo.isCompleted == false ? "#8bc34a" : "white", backgroundColor: todo.isCompleted == false ? "white" : "#8bc34a", border: "solid #8bc34a 3px" }}>
                                <DoneIcon />
                            </IconButton>
                            <IconButton onClick={handleUpdateDailogOpen} className='iconButton' sx={{ color: "#1769aa", backgroundColor: "white", border: "solid #1769aa 3px" }} >
                                <ModeOutlinedIcon />
                            </IconButton>
                            <IconButton onClick={handleDeleteClick} className='iconButton' sx={{ color: "#b23c17", backgroundColor: "white", border: "solid #b23c17 3px" }}     >
                                <DeleteOutlineOutlinedIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card >
        </>
    )
}