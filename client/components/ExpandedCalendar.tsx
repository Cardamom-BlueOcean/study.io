import * as React from 'react';
import 'date-fns';
import { alpha } from '@material-ui/core/styles'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  LocalizationProvider,
} from '@mui/lab';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import {
  Box,
  ThemeProvider,
  Typography,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { ArrowBack, KeyboardArrowDown, } from '@mui/icons-material';
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  setDoc,
  orderBy,
  getDoc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import InviteForm from './InviteForm';

export default function ExpandedCalendar({ setShowCalendar, searchedUsers, searchedUsersFullInfo }) {

  const [selectedDate, setSelectedDate] = React.useState<any>(new Date().toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' }));
  console.log('selectedDate', selectedDate)
  const [accepted, setAccepted] = React.useState<Array<string>>([]);
  const [pending, setPending] = React.useState<Array<string>>([]);
  const [checked, setChecked] = React.useState<Array<any>>(pending.slice().fill(false));
  const [scheduledMeeting, setScheduleMeeting] = React.useState<boolean>(false);


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

  const renderEvents = () => (
    <ul>
      {accepted.map((event, idx) => {
        if (event.includes(selectedDate)) {
          return (
            <li key={idx} style={{ fontWeight: '300', fontSize: '16px' }}>{event}</li>
          )
        }
      })}
    </ul>
  )

  React.useEffect(() => {
    renderEvents()
  }, [selectedDate])

  const renderPending = () => (
    <ul style={{ paddingLeft: '5px' }}>
      {pending.map((meeting, idx) => (
        <Box key={idx} sx={{ display: 'flex' }}>
          <Checkbox
            checked={checked[idx]}
            onChange={(e) => {
              updateCheckedBox(idx)
            }}
            inputProps={{ 'aria-label': 'controlled' }}
            key={idx}
          />
          <Box sx={{ fontSize: '16px', fontWeight: '300' }}>{meeting} </Box>
        </Box>
      ))}
    </ul>
  )

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
    <Box className="animate__animated animate__fadeIn" sx={{ width: '100%', padding: '8px' }}>
      <Button variant="text" onClick={() => setShowCalendar(false)}><ArrowBack />
        <Typography>  Back</Typography></Button>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>

        <LocalizationProvider dateAdapter={AdapterDateFns} >
          <StaticDatePicker<Date>
            orientation="portrait"
            openTo="day"
            value={selectedDate}
            onChange={(newDate: any) => {
              setSelectedDate(newDate.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' }));
              renderEvents()
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <Box>

          <Box sx={{ placeSelf: 'center', marginTop: '50px' }}>
            {selectedDate === (new Date().toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })) ?
              <Box sx={{ display: 'flex', justifyContent: 'center' }}><Typography variant="h4" sx={{ fontWeight: 'light' }}>Today's Events</Typography></Box>
              :
              <Box sx={{ display: 'flex', justifyContent: 'center' }}><Typography variant="h4" sx={{ fontWeight: 'light' }}>{selectedDate} Events</Typography></Box>
            }
          </Box>

          {accepted.length === 0 ?
            <Typography>No meet ups scheduled today</Typography>
            : renderEvents()
          }

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'light' }}>Your Pending Invites</Typography>
          </Box>

          {pending.length === 0 ?
            <Typography>No meet ups scheduled today</Typography>
            : renderPending()
          }

        </Box>
      </Box>

      <Divider variant="middle" />

      <Box sx={{ display: 'grid', justifyContent: 'center' }}>

        <Button variant="outlined"
          sx={{ width: '728.39px', marginTop: '20px', marginBottom: '20px' }}
          onClick={() => { setScheduleMeeting(prev => !prev) }}>Schedule Meeting</Button>
        {scheduledMeeting ? <InviteForm searchedUsers={searchedUsers} searchedUsersFullInfo={searchedUsersFullInfo} /> : null}

      </Box>

    </Box >
  );
}
