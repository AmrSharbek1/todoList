import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { useContext } from 'react';
import { TodoContext } from '../contexts/todoContext';
import { ToastContext } from '../contexts/toastContext';
// ICONS
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import DoneIcon from '@mui/icons-material/Done';
export default function ToDo({ todo, DialogDelete, DialogUpdate }) {
    const { todoArr, SetToDoArr } = useContext(TodoContext);
    const { showHideToast, setMassageToast, setToastColor } = useContext(ToastContext);
    //=====================//
    //start funtion Completed
    const handleCheckClick = () => {
        const updatedToDos = todoArr.map((t) => {
            if (t.id === todo.id) {
                return { ...t, isCompleted: !t.isCompleted }
            }
            return t;
        })

        if (!todo.isCompleted) {
            setToastColor(true)
            setMassageToast("تم اضافة المهمة الى المنجز");

        } else {
            setToastColor(false);
            setMassageToast("تم ازاله المهمة من المنجز")
        }

        SetToDoArr(updatedToDos);
        showHideToast();
        localStorage.setItem("todos", JSON.stringify(updatedToDos));
    }
    //end funtion Completed
    const handleDeleteClick = () => {
        DialogDelete(todo);
    };
    const handleUpdateDailogOpen = () => {
        DialogUpdate(todo);
    }
    return (
        <>
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