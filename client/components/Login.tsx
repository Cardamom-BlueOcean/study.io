
import { createTheme } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  Paper,
  Typography,
  Button
} from "@mui/material";
import { getFirestore, collection } from "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebaseConfig from '../../config';
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import GoogleIcon from '@mui/icons-material/Google';
=======
import logo from '../../src/logo.png'
>>>>>>> 0d0194864de63d803542ce2999d6c755fc9616e1

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const firestore = getFirestore();
// const database = getDatabase(app);

type Props = {};

export default function Login({ }: Props) {
  let navigate = useNavigate();
  const [user] = useAuthState(auth);
  const signInWithGoogle = async () => {

    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);

    if (user) {
      navigate(`/userlogin`)
    }
  };


  return (
    <div style={{ background: '#542F34', justifyContent: "center", padding: "400px 0 50px 0" }}>
      <Box sx={{ backgroundColor: '#542F34' }}> <img src={logo} style={{ display: 'block', margin: 'auto' }}></img></Box>
      {/* <CssBaseline /> */}
      <Box
        height="100vh"
        display="flex"
        // justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
<<<<<<< HEAD
        <Button variant="contained" startIcon={<GoogleIcon />} onClick={() => { signInWithGoogle() }}>Sign in with Google</Button>
=======
        <Paper
          elevation={20}
          sx={{ padding: "1rem", backgroundColor: "secondary.light", marginTop: "50px" }}
        >
          <Typography color="primary.main" variant="h1" onClick={() => { signInWithGoogle() }}>
            Sign in With Google
          </Typography>
        </Paper>
>>>>>>> 0d0194864de63d803542ce2999d6c755fc9616e1
      </Box>
    </div>
  );
}