import * as React from 'react';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { TodoContext } from '../contexts/todoContext';
import { useContext, useEffect, useMemo } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// components 
import ToDo from './ToDo';
//  OTHERS
import { v4 as uuidv4 } from 'uuid';
export default function ToDoList() {
    const { todoArr, SetToDoArr } = useContext(TodoContext);
    // Start State
    const [displayedTodoType, setDisplayedTodoType] = React.useState('all');
    const [title, setTitle] = React.useState("");
    const [showDeleteDialog, setShowDeleteDialog,] = React.useState(false);
    const [DialogTodo, setDialogTodo] = React.useState(null);
    // End State    
    // start function handleChange
    const handleChange = (e) => {
        setDisplayedTodoType(e.target.value);
    }
    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }
    const clickButtonAddToDo = () => {
        if (title.trim() !== "") {
            const updateTodo = [...todoArr, { id: uuidv4(), title: title, details: "", isCompleted: false }];
            SetToDoArr(updateTodo);
            localStorage.setItem("todos", JSON.stringify(updateTodo));
            setTitle("");
        }
    }
    useEffect(() => {
        const update = JSON.parse(localStorage.getItem("todos")) || [];
        SetToDoArr(update);
    }, []);
    // filter array 
    const completedTodos = useMemo(() => {
        return todoArr.filter((t) => {
            return t.isCompleted;
        })
    }, [todoArr])
    const notCompletedTodos = useMemo(() => {
        return todoArr.filter((t) => {
            return !t.isCompleted;
        })
    }, [todoArr])
    let todoToBeRendered = todoArr;
    if (displayedTodoType == "completed") {
        todoToBeRendered = completedTodos;
    } else if (displayedTodoType == "non-completed") {
        todoToBeRendered = notCompletedTodos;
    }

    // start function delete

    const handleDeleteDialogClose = () => {
        setShowDeleteDialog(false);
    }
    const handleDailog = (todo) => {
        setShowDeleteDialog(true);
        setDialogTodo(todo);
    }
    const handleCloseAndDelete = () => {
        setShowDeleteDialog(false);
        const deleteToDo = todoArr.filter((t) => {
            return t.id != DialogTodo.id;
        })
        SetToDoArr(deleteToDo)
        localStorage.setItem("todos", JSON.stringify(deleteToDo));
    };
    // end function delete
    // End function handleChange
    const todosJSX = todoToBeRendered.map((todo) => {
        return (
            <ToDo key={todo.id} todo={todo} DialogDelete={handleDailog} />
        )
    })
    return (
        <>
            {/* DELETE MODAL  */}
            <Dialog
                open={showDeleteDialog}
                onClose={handleDeleteDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ textDecoration: "rtl" }}>
                    هل انت متاكد من رغبتك في حذف المهمة ؟
                </DialogTitle>
                <DialogContent sx={{ textAlign: "right", pr: 3.5 }}>
                    <DialogContentText id="alert-dialog-description">
                        لا يمكنك التراجع عن الحذف في  حال اختيار زر الحذف
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAndDelete} sx={{ color: "red" }}>نعم , احذف</Button>
                    <Button onClick={handleDeleteDialogClose} autoFocus>
                        اغلاق
                    </Button>
                </DialogActions>
            </Dialog>
            {/* ===DELETE MODAL===  */}
            <Container maxWidth="sm"  >
                <Card sx={{ minWidth: 500, textAlign: "center", maxHeight: "80vh", overflowY: "auto   " }}>
                    <CardContent >
                        <Typography variant='h3' sx={{ fontWeight: "bold" }}>
                            مهامي
                        </Typography>
                        <Divider sx={{ mb: 3 }} />
                        {/*=== FILTER BUTTON ===*/}
                        <ToggleButtonGroup
                            color="primary"
                            value={displayedTodoType}
                            exclusive
                            onChange={handleChange}
                            sx={{ direction: "ltr" }}
                        >
                            <ToggleButton value="non-completed" >غير منجز</ToggleButton>
                            <ToggleButton value="completed" >منجز</ToggleButton>
                            <ToggleButton value="all">الكل</ToggleButton>
                        </ToggleButtonGroup>
                        {/*=== END FILTER BUTTON ===*/}
                        {/* all ToDo  */}
                        {todosJSX}
                        {/* all ToDo  */}
                        {/* === ADD BUTTON + INPUT === */}
                        <Grid container sx={{ mt: 2 }} spacing={2}>
                            <Grid size={8} >
                                <TextField label="عنوان المهمة" value={title} fullWidth variant='outlined' onChange={handleChangeTitle}></TextField>
                            </Grid>
                            <Grid size={4} >
                                <Button onClick={clickButtonAddToDo} fullWidth sx={{ fontWeight: "700", height: "100%", backgroundColor: "#cf3a0dff" }} variant="contained">إضافة</Button>
                            </Grid>
                        </Grid>
                        {/* === ADD BUTTON + INPUT === */}
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}