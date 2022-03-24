
import * as React from 'react';
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

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

const App = () => {
  const theme = createTheme({
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



  const colorMode = React.useContext(ColorModeContext);


  return (

    < Provider store={store} >
      <p> {theme.palette.mode} mode</p>
      <p onClick={() => theme.palette.mode = 'light'}>change mode</p>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/about" />
            <Route path="/userlogin" element={<UserPage />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </Router >
      </ThemeProvider>
    </Provider >
  );
}

export default App;