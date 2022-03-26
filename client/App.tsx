import * as React from 'react';
import { useState, useMemo } from 'react';
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
  PaletteMode
} from "@mui/material";
import { AnyRecord } from 'dns';

const App = () => {

  const [toggleDark, settoggleDark] = useState(false);

  const [mode, setMode] = useState('light');

  const colorMode = React.useMemo(
    () => ({
      toggleColor: () => {
        setMode((prevMode: any) => prevMode === 'light' ? 'dark' : 'light')
      }
    }), [])

  const customColorTheme = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
          primary: {
            light: "#C2B9B0",
            main: "#542F34",
            dark: "#A6607C",
            contrastText: "#fff",
          },
          divider: "#ebe5df",
          border: "#d9a0b7",
          text: {
            primary: '#000',
            secondary: '#806543'
          }
        } : {
          primary: {
            light: "#C2B9B0",
            main: "#E7717D",
            dark: "#C2CAD0",
            contrastText: "#fff",
          },
          divider: "#ebe5df",
          background: '#ffffff',
          border: "#E7717D",
          text: {
            primary: '#000',
            secondary: '#7e685a'
          }
        })
    },
    typography: {
      fontFamily: ["Montserrat, sans-serif"]
    }
  })

  const theme = React.useMemo(() => createTheme(customColorTheme(mode)), [mode]);

  return (

    <Provider store={store} >

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/about" />
            <Route path="/userlogin" element={<UserPage toggleDark={toggleDark} settoggleDark={settoggleDark} currentMode={theme.palette.mode} mode={mode} theme={theme} setMode={setMode} />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </Router >
      </ThemeProvider>
    </Provider >
  );
}

export default App;