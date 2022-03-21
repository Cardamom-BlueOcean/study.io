
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import UserPage from './components/UserPage';
import Login from './components/Login';
import { Provider } from 'react-redux';
import { store } from './store';
import { createTheme } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#806543",
      main: "#542F34",
      dark: "#33266E",
      contrastText: "#A6607C",
    },
    secondary: {
      main: "#4db6ac",
      light: "#82e9de",
      dark: "#00867d",
      contrastText: "#000",
    },
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
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
