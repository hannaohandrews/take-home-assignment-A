import React from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import FormDataComponent from './components/FormDataComponent'

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
})

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FormDataComponent />
    </ThemeProvider>
  )
}

export default App
