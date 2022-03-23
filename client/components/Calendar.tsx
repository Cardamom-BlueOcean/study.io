import * as React from 'react';
import styled from 'styled-components';
import ExpandedCalendar from './ExpandedCalendar';
import {
  Box,
  CssBaseline,
  Paper,
  ThemeProvider,
  Typography,
  Button,
  Checkbox,
} from "@mui/material";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  setDoc,
  orderBy,
  getDoc
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// const Reminder = styled.div`
// height: 500px;
// width: 300px;
// border: 3px solid black;
// `



export default function Calendar({ setShowCalendar }) {

  React.useEffect(() => {
    const asyncWrapper = async () => {
      const db = await getFirestore();
      const auth: any = await getAuth();
      onAuthStateChanged(auth, (user: any) => {
        const getEventsForCurrentUser = async () => {
          console.log('auth', user.uid)
          const q: any = doc(db, "Users", user.uid);
          const userData = await getDoc(q);
          console.log('userdata', userData.data())
        }
        getEventsForCurrentUser()
      })
    }
    asyncWrapper()
  }, [])


  const addToUserArray = async () => {


  }



  const [openCalendarModal, setOpenCalendarModal] = React.useState<boolean>(false);
  const [accepted, setAccepted] = React.useState<Array<string>>([]);
  const [pending, setPending] = React.useState<Array<string>>([]);
  const [checked, setChecked] = React.useState<Array<any>>(pending.slice().fill(false));


  React.useEffect(() => {
    setAccepted(['Meeting with John at 2pm to study Python', 'Meeting with Tobin at 5pm to study Firebase', 'Meeting with BJ at 6pm to study Material UI']);
    setPending(['Alex invited you to study Typescript tomorrow at 12pm', 'Richard invited you to study Redux March 24 at 1pm']);
  }, [])

  const updateCheckedBox = async (idx) => {
    setChecked(checked.map((val, index) => (
      index === idx ? !val : val
    )))

    // move the pending invite object to the accepted array
    const db = await getFirestore();
    const auth: any = await getAuth();
    await setDoc(doc(db, "Users", user.uid), {
      name: user.displayName,
      email: user.email,
      thumbnailPhotoURL: user.photoURL,
      uid: user.uid,
      rooms: arrayUnion(roomName)
    }, { merge: true });
  }

  return (
    <Box
      sx={{
        // height: 300,
        // width: 300,
        // border: 1,
      }}>
      <Typography variant="h5">Today's Scheduled Events</Typography>
      <Typography variant="h6">Accepted Invites</Typography>
      <ul>
        {accepted.map((meeting, idx) => {
          if (idx < 2) {
            return (
              <li key={idx} >{meeting} </li>

            )

          }
        })}
      </ul>
      <Typography variant="h6">Pending Invites</Typography>
      {pending.map((meeting, idx) => (
        <Box key={idx}>
          <Checkbox
            checked={checked[idx]}
            onChange={(e) => updateCheckedBox(idx)}
            inputProps={{ 'aria-label': 'controlled' }}
            key={idx}
          />
          <Box >{meeting} </Box>

        </Box>
      ))}
      {/* TODO button onclick, rerender chat view to show calendar */}
      <Button variant="contained" onClick={() => setShowCalendar(true)}>Show Calendar</Button>

    </Box >
  );
}