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


const firebaseConfig = {
  apiKey: "AIzaSyDCi0_iWWgSu1O8yk_LCflEUTnlVUev3K8",
  authDomain: "studyio-97c11.firebaseapp.com",
  projectId: "studyio-97c11",
  storageBucket: "studyio-97c11.appspot.com",
  messagingSenderId: "776844865130",
  appId: "1:776844865130:web:18af58299f13a63df0a413",
  measurementId: "G-90FNB3EGMV"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const firestore = getFirestore();
// const database = getDatabase(app);

type Props = {};

function App({}: Props) {
  const[toggle, setToggle] = useState(false)

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };


  const theme = createTheme({
    palette: {
      primary: {
        light: "#63b8ff",
        main: "#0989e3",
        dark: "#005db0",
        contrastText: "#000",
      },
      secondary: {
        main: "#4db6ac",
        light: "#82e9de",
        dark: "#00867d",
        contrastText: "#000",
      },
    },
  });
  const theme2 = createTheme({
    palette: {
      primary: {
        light: "blue",
        main: "#0989e3",
        dark: "#005db0",
        contrastText: "#000",
      },
      secondary: {
        main: "#4db6ac",
        light: "blue",
        dark: "#00867d",
        contrastText: "#000",
      },
    },
  });

  const[currentTheme, setCurrentTheme] =useState(theme)
  const setTheme = () => {
    setToggle(!toggle)
    toggle ? setCurrentTheme(theme) : setCurrentTheme(theme2)
  }

  useEffect(() => {
    alert('changed')
  }, [])




  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Paper
          elevation={3}
          sx={{ padding: "1rem", backgroundColor: "secondary.light" }}
        >
          <Typography color="primary.dark" variant="h1" onClick={()=> {signInWithGoogle()}}>
            Sign in With Google
          </Typography>
          <Button variant="contained" onClick={() => {setTheme() }}>Contained</Button>
        </Paper>setToggle
      </Box>
    </ThemeProvider>
  );
}

export default App;
