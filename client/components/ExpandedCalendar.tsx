import * as React from 'react';
import 'date-fns';
import { alpha } from '@material-ui/core/styles'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  LocalizationProvider,
  DesktopDatePicker,
} from '@mui/lab';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import {
  Box,
  ThemeProvider,
  Typography,
  Button,
  Divider,
  TextField,
  Menu,
  MenuItem,

} from "@mui/material";
import PopupState, {
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state';
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
  getDoc
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function ExpandedCalendar({ setShowCalendar }) {

  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [events, setEvents] = React.useState<Array<string>>([]);
  const [pending, setPending] = React.useState<Array<string>>([]);
  const [checked, setChecked] = React.useState<Array<any>>(pending.slice().fill(false));

  //add meeting stuff
  const [scheduledMeeting, setScheduleMeeting] = React.useState<boolean>(false);
  const [participant, setParticipant] = React.useState<string>('');

  React.useEffect(() => {
    const asyncWrapper = async () => {
      const db = await getFirestore();
      const auth: any = await getAuth();
      onAuthStateChanged(auth, (user: any) => {
        const getEventsForCurrentUser = async () => {
          // console.log('auth', user.uid)
          const q: any = doc(db, "Users", user.uid);
          const userData = await getDoc(q);
          console.log('userdata', userData.data())
          //This is not working
          setEvents(userData.data().acceptedInvites)
          setPending(userData.data().pendingInvites)
        }
        getEventsForCurrentUser()
      })
    }
    asyncWrapper()
  }, [])

  console.log('events', events)
  console.log('pending', pending)

  const renderEvents = () => (
    <ul>
      {events.map((event, idx) => (
        <li key={idx}>{event}</li>
      ))}
    </ul>
  )
  const renderPending = () => (
    <ul style={{ paddingLeft: '5px' }}>
      {pending.map((meeting, idx) => (
        <Box key={idx} sx={{ display: 'flex' }}>
          <Checkbox
            checked={checked[idx]}
            onChange={(e) => updateCheckedBox(idx)}
            inputProps={{ 'aria-label': 'controlled' }}
            key={idx}
          />
          <Box sx={{ fontSize: '16px', fontWeight: 'light' }}>{meeting} </Box>
        </Box>
      ))}
    </ul>
  )

  const updateCheckedBox = async (idx) => {
    setChecked(checked.map((val, index) => (
      index === idx ? !val : val
    )))
  }


  const sendInvite = () => (
    <Box sx={{ placeSelf: 'center', alignContent: 'center' }}>
      {/* <Typography variant="h6">Select Meeting Date</Typography> */}
      <Box sx={{ display: 'flex' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Select Meeting Date"
            value={selectedDate}
            minDate={new Date('2017-01-01')}
            onChange={(newValue: any) => {
              setSelectedDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          id="outlined-name"
          label="Participant"
          value={participant}
          onChange={(e) => setParticipant(e.target.value)}
          sx={{ width: '220px' }}
        />
      </Box>
      <Typography variant="h6">Select Meeting Room</Typography>
      <PopupState variant="popover" popupId="choose-room" >
        {(menu) => (
          <React.Fragment>
            <Button variant="contained" {...bindTrigger(menu)}
              endIcon={<KeyboardArrowDown />}
              sx={{ marginBottom: '20px' }}
            >
              Study Groups

            </Button>
            {/*TODO render room names in menu */}
            <Menu {...bindMenu(menu)}>
              <MenuItem onClick={menu.close}>Profile</MenuItem>
              <MenuItem onClick={menu.close}>My account</MenuItem>
              <MenuItem onClick={menu.close}>Logout</MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
      <Divider />
    </Box>
  );


  return (
    <Box sx={{ width: '100%' }}>

      <Button variant="text" onClick={() => setShowCalendar(false)}><ArrowBack />
        <Typography>  Back</Typography></Button>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>

        <LocalizationProvider dateAdapter={AdapterDateFns} >
          <StaticDatePicker<Date>
            orientation="portrait"
            openTo="day"
            value={selectedDate}
            // shouldDisableDate={isWeekend}
            onChange={(newDate: any) => {
              console.log('aksd', newDate)
              setSelectedDate(newDate);
              //TODO remove hard coded array
              setEvents(['is this working??', 'asdljasdjas'])
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Box>
          <Box sx={{ placeSelf: 'center' }}>
            {selectedDate.toDateString() === (new Date()).toDateString() ?
              <Typography variant="h4" sx={{ alignItems: 'center', justifyContent: 'center' }}>Today's Events</Typography>
              :
              <Typography variant="h4">{selectedDate.toLocaleString('default', { month: 'long', day: 'numeric' })} Events</Typography>
            }
          </Box>
          {events.length === 0 ?
            <Typography>No meet ups scheduled today</Typography>
            : renderEvents()
          }

          <Box sx={{ placeSelf: 'center' }}>

            <Typography variant="h4">Pending Invites</Typography>

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
          sx={{ width: '500px', marginTop: '20px', marginBottom: '20px' }}
          onClick={() => { setScheduleMeeting(prev => !prev) }}>Schedule Meeting</Button>
        {scheduledMeeting ? sendInvite() : null}


        {/* <Box sx={{ placeSelf: 'center' }}>
          {selectedDate.toDateString() === (new Date()).toDateString() ?
            <Typography variant="h4" sx={{ alignItems: 'center', justifyContent: 'center' }}>Today's Events</Typography>
            :
            <Typography variant="h4">{selectedDate.toLocaleString('default', { month: 'long', day: 'numeric' })} Events</Typography>
          }
        </Box>
        {
          events.length === 0 ?
            <Typography>No meet ups scheduled today</Typography>
            : renderEvents()
        }

        <Box sx={{ placeSelf: 'center' }}>

          <Typography variant="h4">Pending Invites</Typography>

        </Box>
        {
          events.length === 0 ?
            <Typography>No meet ups scheduled today</Typography>
            : <Typography>stuff</Typography>
        } */}
      </Box>
    </Box >
  );
}