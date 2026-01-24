import './App.css'
import ToDoList from './components/ToDoList'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { TodoContext } from './contexts/todoContext';
import { ToastProvider } from './components/ToastProvider';
import { useState } from 'react';
const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"]
  }
})
function App() {
  const [todoArr, SetToDoArr] = useState([]);
  return (
    <ThemeProvider theme={theme}>
      <div className='mainDiv'>
        <ToastProvider >
          <TodoContext.Provider value={{ todoArr, SetToDoArr }}>
            <ToDoList />
          </TodoContext.Provider>
        </ToastProvider>
      </div>
    </ThemeProvider>
  )
}
export default App
