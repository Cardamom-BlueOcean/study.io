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
  Divider,
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

  const [accepted, setAccepted] = React.useState<Array<string>>([]);
  const [pending, setPending] = React.useState<Array<string>>([]);
  const [checked, setChecked] = React.useState<Array<any>>(pending.slice().fill(false));

  React.useEffect(() => {
    const asyncWrapper = async () => {
      const db = await getFirestore();
      const auth: any = await getAuth();
      onAuthStateChanged(auth, (user: any) => {
        const getEventsForCurrentUser = async () => {
          // console.log('auth', user.uid)
          const q: any = doc(db, "Users", user.uid);
          const userData = await getDoc(q);
          // console.log('userdata', userData.data())

          setAccepted(userData.data().acceptedInvites)
          setPending(userData.data().pendingInvites)
        }
        getEventsForCurrentUser()
      })
    }
    asyncWrapper()
  }, [])

  // console.log('accepted', accepted)
  // console.log('pending', pending)


  // React.useEffect(() => {
  //   setAccepted(['Meeting with John at 2pm to study Python', 'Meeting with Tobin at 5pm to study Firebase', 'Meeting with BJ at 6pm to study Material UI']);
  //   setPending(['Alex invited you to study Typescript tomorrow at 12pm', 'Richard invited you to study Redux March 24 at 1pm']);
  // }, [])

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
      <Typography sx={{ fontSize: '20px', fontWeight: 'medium', textAlign: 'center' }}>Today's Scheduled Events</Typography>
      <Typography sx={{ fontSize: '16px', fontWeight: 'light', textAlign: 'center' }}>Accepted Invites</Typography>
      <ul style={{ margin: '0 auto' }}>
        {accepted.map((meeting, idx) => {
          if (idx < 2) {
            return (
              <li key={idx} style={{ fontSize: '14px', fontWeight: 'light' }}>{meeting} </li>
            )
          }
        })}
        {/*TODO add onclick - open expanded calender */}
        {accepted.length > 2 ? <Button variant="text" sx={{ fontWeight: 'light', fontSize: '10px' }}>...Show More</Button> : null}
      </ul>
      <Divider variant="middle" />
      <Typography sx={{ fontSize: '16px', fontWeight: 'light', textAlign: 'center' }} onClick={() => setShowCalendar(true)}>Pending Invites</Typography>
      {pending.map((meeting, idx) => {
        if (idx < 1) {
          return (<Box key={idx} sx={{ display: 'flex' }}>
            <Checkbox
              checked={checked[idx]}
              onChange={(e) => updateCheckedBox(idx)}
              inputProps={{ 'aria-label': 'controlled' }}
              key={idx}
            />
            <Box sx={{ fontSize: '14px', fontWeight: 'light' }}>{meeting} </Box>
          </Box>)
        }
      })}
      {/*TODO add onclick - open expanded calender */}
      {pending.length > 2 ? <Button variant="text" sx={{ fontWeight: 'light', fontSize: '10px' }}>...Show More</Button> : null}

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" onClick={() => setShowCalendar(true)}>Show Calendar</Button>

      </Box>

    </Box >
  );
}