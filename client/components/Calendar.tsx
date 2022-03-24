import * as React from 'react';
import {
  Box,
  ThemeProvider,
  Typography,
  Button,
  Checkbox,
  Divider,
} from "@mui/material";
import {
  getFirestore,
  onSnapshot,
  doc,
  updateDoc
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
          const unsubscribe = onSnapshot(q, (userData) => {
            setAccepted(userData.data().acceptedInvites)
            setPending(userData.data().pendingInvites)
          });
        }
        getEventsForCurrentUser()
      })
    }
    asyncWrapper()
  }, [])


  const updateCheckedBox = async (idx) => {
    setChecked(checked.map((val, index) => (
      index === idx ? !val : val
    )))

    const asyncWrapper = async () => {
      const db = await getFirestore();
      const auth: any = await getAuth();
      onAuthStateChanged(auth, (user: any) => {
        const updateInviteArrays = async () => {
          let checkedInvite = pending.splice(idx, 1);
          accepted.push(checkedInvite[0])
          setAccepted(accepted)

          await updateDoc(doc(db, "Users", user.uid), {
            acceptedInvites: accepted,
            pendingInvites: pending
          });
        }
        updateInviteArrays()
      })
    }
    asyncWrapper()
  }

  return (
    <>
      <Typography color="primary.contrastText" sx={{ fontSize: '18px', fontWeight: '600', textAlign: 'center', background: '#542F34', fontFamily: "Montserrat, sans-serif" }}>Today's Scheduled Events</Typography>
      <Box sx={{ padding: '5px', paddingRight: '8px' }}>
        <Typography sx={{ fontSize: '16px', fontWeight: '400', textAlign: 'center', fontFamily: "Montserrat, sans-serif" }}>Accepted Invites</Typography>
        <ul style={{ margin: '0 auto' }}>
          {accepted.map((meeting, idx) => {
            if (idx < 2) {
              return (
                <li key={idx} style={{ fontSize: '14px', fontWeight: '300', fontFamily: "Montserrat, sans-serif" }}>{meeting} </li>
              )
            }
          })}
          {accepted.length > 2 ?
            <Box sx={{ display: 'flex', justifyContent: 'end' }}><Button variant="text" sx={{ fontWeight: 'light', fontSize: '10px' }} onClick={() => setShowCalendar(true)}>...Show More</Button> </Box>
            : null}
        </ul>
        <Divider variant="middle" />
        <Typography sx={{ fontSize: '16px', fontWeight: '400', textAlign: 'center', fontFamily: "Montserrat, sans-serif" }} onClick={() => setShowCalendar(true)}>Pending Invites</Typography>
        {pending.map((meeting, idx) => {
          if (idx < 1) {
            return (<Box key={idx} sx={{ display: 'flex' }}>
              <Checkbox
                checked={checked[idx]}
                onChange={(e) => updateCheckedBox(idx)}
                inputProps={{ 'aria-label': 'controlled' }}
                key={idx}
              />
              <Box sx={{ fontSize: '14px', fontWeight: '300', fontFamily: "Montserrat, sans-serif" }}>{meeting} </Box>
            </Box>)
          }
        })}
        {pending.length > 2 ?
          <Box sx={{ display: 'flex', justifyContent: 'end' }}><Button variant="text" sx={{ fontWeight: 'light', fontSize: '10px' }} onClick={() => setShowCalendar(true)}>...Show More</Button></Box>
          : null}

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => setShowCalendar(true)}>Show Calendar</Button>
        </Box>
      </Box >
    </>
  );
}