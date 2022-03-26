import {
  Box,
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
import GoogleIcon from '@mui/icons-material/Google';
import logo from '../../src/logo.png';
import "animate.css";

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
    <Box sx={{ justifyContent: "center", padding: "400px 0 50px 0", backgroundColor: "primary.main" }}>
      <Box color="primary.dark"> <img className="animate__animated animate__fadeInDown" src={logo} style={{ display: 'block', margin: 'auto' }}></img></Box>
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Button sx={{ width: 300, height: 50, backgroundColor: '#fff', color: '#542F34' }} variant="contained" startIcon={<GoogleIcon />} onClick={() => { signInWithGoogle() }}>Sign in with Google</Button>
      </Box>
    </Box>
  );
}

