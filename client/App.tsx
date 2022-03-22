
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
      main: "#A6607C",
      light: "#fff",
      dark: "#542F34",
      contrastText: "#542F34",
    },
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/about" />
          <Route path="/userlogin" element={<UserPage />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router >
    </Provider>
  );
}

export default App;