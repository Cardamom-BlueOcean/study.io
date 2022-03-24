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



const theme2 = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: "#806543",
      main: "#542F34",
      dark: "#33266E",
      contrastText: "#A6607C",
    },
    secondary: {
      main: "#A6607C",
      light: "#fff",
      dark: "#542F34",
      contrastText: "#542F34",
    },
  },
});

const App = () => {

  const [toggleDark, settoggleDark] = useState(false);

  const theme = createTheme({
    palette: {
      mode: toggleDark ? "dark" : "light",
      primary: {
        light: "#806543",
        main: "#542F34",
        dark: "#33266E",
        contrastText: "#A6607C",
      },
      secondary: {
        main: "#A6607C",
        light: "#fff",
        dark: "#542F34",
        contrastText: "#542F34",
      },
    },
  })

  return (

    < Provider store={store} >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/about" />
            <Route path="/userlogin" element={<UserPage toggleDark={toggleDark} settoggleDark={settoggleDark} currentMode={theme.palette.mode} />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </Router >
      </ThemeProvider>
    </Provider >
  );
}

export default App;