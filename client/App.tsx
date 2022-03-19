import {useState, useEffect} from "react";
import { createTheme } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  Paper,
  ThemeProvider,
  Typography,
  Button
} from "@mui/material";
import firebase from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import UserPage from './components/GroupTabs';
import Login from './components/Login';


// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth();
// const firestore = getFirestore();
// const database = getDatabase(app);

// type Props = {};

// function App({ }: Props) {

//   const signInWithGoogle = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(auth, provider);
//   };
//   const theme = createTheme({
//     palette: {
//       primary: {
//         light: "#63b8ff",
//         main: "#0989e3",
//         dark: "#005db0",
//         contrastText: "#000",
//       },
//       secondary: {
//         main: "#4db6ac",
//         light: "#82e9de",
//         dark: "#00867d",
//         contrastText: "#000",
//       },
//     },
//   });
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box
//         height="100vh"
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         flexDirection="column"
//       >
//         <Paper
//           elevation={3}
//           sx={{ padding: "1rem", backgroundColor: "secondary.light" }}
//         >
//           <Typography color="primary.dark" variant="h1" onClick={() => { signInWithGoogle() }}>
//             Sign in With Google
//           </Typography>
//         </Paper>
//       </Box>
//       <GroupTabs />
//     </ThemeProvider>
//   );
// }
//const auth = getAuth();

const App = () => {

  //const [user] = useAuthState(auth);
  return (
    <Router>
      <Routes>
        <Route path="/about" />
        <Route path="/userlogin" element={<UserPage />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router >
  );
}

export default App;
