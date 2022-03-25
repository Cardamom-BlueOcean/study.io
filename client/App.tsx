import * as React from 'react';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import UserPage from './components/UserPage';
import Login from './components/Login';
import { Provider } from 'react-redux';
import { store } from './store';
import { useTheme, createTheme } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";

const App = () => {

  const [toggleDark, settoggleDark] = useState(false);

  // const toggleColorTheme = (mode) => ({
  //   palette: {
  //     mode,
  //     primary: {
  //       light: "#806543",
  //       main: "#542F34",
  //       dark: "#A6607C",
  //       contrastText: "#fff",
  //       ...(mode === 'dark' && {
  //         main: '#542F34',
  //       }),
  //     },
  //     ...(mode === 'dark' {
  //       background: {
  //         default: '#fff'

  //       }
  //     })
  //   }
  // })

  const theme = createTheme({
    palette: {
      mode: toggleDark ? "dark" : "light",
      primary: {
        light: "#806543",
        main: "#542F34",
        dark: "#A6607C",
        contrastText: "#fff",
      },
      secondary: {
        light: "#fff",
        main: "#A6607C",
        dark: "#542F34",
        contrastText: "#806543",
      },
    },
    typography: {
      fontFamily: ["Montserrat, sans-serif"]
    }
  })

  return (

    < Provider store={store} >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/about" />
            <Route path="/userlogin" element={<UserPage toggleDark={toggleDark} settoggleDark={settoggleDark} currentMode={theme.palette.mode} theme={theme} />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </Router >
      </ThemeProvider>
    </Provider >
  );
}

export default App;