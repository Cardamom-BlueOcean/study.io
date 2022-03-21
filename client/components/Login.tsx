
import { createTheme } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  Paper,
  Typography,
} from "@mui/material";
import firebase from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebaseConfig from '../../config';
import { useNavigate } from "react-router-dom";

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
    <div>
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
          <Typography color="primary.dark" variant="h1" onClick={() => { signInWithGoogle() }}>
            Sign in With Google
          </Typography>
        </Paper>
      </Box>
    </div>
  );
}