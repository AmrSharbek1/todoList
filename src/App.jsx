import './App.css'
import * as React from 'react';
import ToDoList from './components/ToDoList'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { TodoContext } from './contexts/todoContext';

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"]
  }
})
function App() {
  const [todoArr, SetToDoArr] = React.useState([]);
  return (

    <ThemeProvider theme={theme}>
      <div className='mainDiv'>
        <TodoContext.Provider value={{ todoArr, SetToDoArr }}>
          <ToDoList />
        </TodoContext.Provider>
      </div>
    </ThemeProvider>

  )
}
export default App
