import './App.css'
import * as React from 'react';
import ToDoList from './components/ToDoList'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { TodoContext } from './contexts/todoContext';
import MySnackBar from './components/MySnackBar';
import { ToastContext } from './contexts/toastContext';
const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"]
  }
})
function App() {
  const [todoArr, SetToDoArr] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [massageToast, setMassageToast] = React.useState("");
  const [toastColor, setToastColor] = React.useState(true);
  const showHideToast = () => {
    setOpen(true);
    setTimeout(() => { 
      setOpen(false);
    }, 2500);
  }
  return (
    <ThemeProvider theme={theme}>
      <div className='mainDiv'>
        <ToastContext.Provider value={{ toastColor, setToastColor, open, massageToast, setMassageToast, showHideToast }}>
          <MySnackBar />
          <TodoContext.Provider value={{ todoArr, SetToDoArr }}>
            <ToDoList />
          </TodoContext.Provider>
        </ToastContext.Provider>
      </div>
    </ThemeProvider>
  )
}
export default App
