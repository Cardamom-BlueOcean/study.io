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
  Autocomplete,
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
  getDoc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function ExpandedCalendar({ setShowCalendar, searchedUsers, searchedUsersFullInfo }) {

  const [selectedDate, setSelectedDate] = React.useState<any>(new Date().toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' }));
  console.log('selectedDate', selectedDate)
  const [accepted, setAccepted] = React.useState<Array<string>>([]);

  // const [events, setEvents] = React.useState<Array<string>>([]);

  const [pending, setPending] = React.useState<Array<string>>([]);
  const [checked, setChecked] = React.useState<Array<any>>(pending.slice().fill(false));
  const [user, setUser] = React.useState<string>('');

  //add meeting stuff
  const [scheduledMeeting, setScheduleMeeting] = React.useState<boolean>(false);
  const [roomsDropdown, setRoomsDropdown] = React.useState<Array<string>>([]);
  //new meeting stuff
  const [newMeetingDate, setNewMeetingDate] = React.useState<string>(new Date().toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' }));
  const [participant, setParticipant] = React.useState<string>('');
  const [time, setTime] = React.useState<string>('');
  const [selectedStudyGroup, setSelectedStudyGroup] = React.useState<string>('')

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
            setRoomsDropdown(userData.data().rooms)
            setUser(userData.data().name)
          });
          // console.log('userdata', userData.data())
        }
        getEventsForCurrentUser()
      })
    }
    asyncWrapper()
  }, [])


  // console.log('events', events)
  // console.log('pending', pending)

  //map not working right when the date is a date that is not today
  const renderEvents = () => (
    <ul>
      {accepted.map((event, idx) => {
        if (event.includes(selectedDate)) {
          return (
            <li key={idx}>{event}</li>

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
              //move pending invite to the accepted invite array
              updateCheckedBox(idx)
            }}
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


  const sendInviteToParticipant = async () => {
    let invitation = `Meeting with ${user} on ${newMeetingDate} at ${time} to study ${selectedStudyGroup}`

    const db = await getFirestore();
    const auth: any = await getAuth();
    const inputValue = (document.getElementById('participanttext') as HTMLInputElement).value
    console.log('searchedUsersFullInfoINCale', searchedUsersFullInfo)
    console.log('inputValue', inputValue)
    const newArr = searchedUsersFullInfo.filter((user) => {
      return user.name === inputValue
    })

    await updateDoc(doc(db, "Users", newArr[0].uid), {
      pendingInvites: arrayUnion(invitation)
    });

    //TODO add string into own event list??
  }

  const sendInvite = () => (
    <Box sx={{ placeSelf: 'center', alignContent: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Select Meeting Date"
            value={selectedDate}
            minDate={new Date()}
            onChange={(meetupDate: any) => {
              let meet = meetupDate.toLocaleString('default', { month: 'long', day: 'numeric' });
              setNewMeetingDate(meet);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>


        <Autocomplete
          disablePortal
          id="participanttext"
          // label="Invitee"
          options={searchedUsers}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Invitee" />}
        />

        {/* <TextField
          id="participanttext"
          label="Invitee"
          value={participant}
          onChange={(e) => setParticipant(e.target.value)}
          sx={{ width: '230px' }}
        /> */}

        <TextField
          id="meetingtimetext"
          label="Enter Meeting Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          sx={{ width: '230px' }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Divider />
        <PopupState variant="popover" popupId="choose-room" >
          {(menu) => (
            <React.Fragment>
              <Button variant="outlined" {...bindTrigger(menu)}
                endIcon={<KeyboardArrowDown />}
                sx={{ marginBottom: '20px', width: '230px' }}
              >
                Study Groups
              </Button>
              <Menu {...bindMenu(menu)}>
                {roomsDropdown.map((room, idx) => (
                  <MenuItem onClick={(e) => {
                    console.log('e.target.textContent', e.target.textContent)
                    menu.close; setSelectedStudyGroup(e.target.textContent)
                  }}
                    key={idx}>{room}</MenuItem>

                ))}
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" sx={{ width: '230px', height: '50px' }} onClick={() => sendInviteToParticipant()}>Submit</Button>

      </Box>
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
            onChange={(newDate: any) => {
              setSelectedDate(newDate.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' }));
              //TODO remove hard coded array
              setAccepted(['is this working??', 'asdljasdjas'])
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Box>
          <Box sx={{ placeSelf: 'center', marginTop: '50px' }}>
            {selectedDate === (new Date()).toDateString() ?
              <Typography variant="h4" sx={{ alignItems: 'center', justifyContent: 'center', fontWeight: 'light' }}>Today's Events</Typography>
              :
              <Typography variant="h4">{selectedDate} Events</Typography>
            }
          </Box>
          {accepted.length === 0 ?
            <Typography>No meet ups scheduled today</Typography>
            : renderEvents()
          }

          <Box sx={{ placeSelf: 'center' }}>

            <Typography variant="h4" sx={{ fontWeight: 'light' }}>Pending Invites</Typography>

          </Box>
          {pending.length === 0 ?
            <Typography>No meet ups scheduled today</Typography>
            : renderPending()
          }
        </Box>
      </Box>

      <Divider variant="middle" />
      <Box sx={{ display: 'grid', justifyContent: 'center' }}>
        <Box>

          <Button variant="outlined"
            sx={{ width: '500px', marginTop: '20px', marginBottom: '20px' }}
            onClick={() => { setScheduleMeeting(prev => !prev) }}>Schedule Meeting</Button>
          {scheduledMeeting ? sendInvite() : null}
        </Box>
      </Box>
    </Box >
  );
}