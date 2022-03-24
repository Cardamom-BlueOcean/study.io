import * as React from 'react';
import 'date-fns';
import { alpha } from '@material-ui/core/styles'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  LocalizationProvider,
  DesktopDatePicker,
} from '@mui/lab';
import {
  Box,
  ThemeProvider,
  Button,
  Divider,
  TextField,
  Autocomplete,
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
  getDoc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function InviteForm({ searchedUsers, searchedUsersFullInfo }) {

  const [user, setUser] = React.useState<string>('');
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


  const sendInviteToParticipant = async () => {
    let invitation = `Meeting with ${user} on ${newMeetingDate} at ${time} to study ${selectedStudyGroup}`

    const db = await getFirestore();
    const auth: any = await getAuth();
    const inputValue = (document.getElementById('participanttext') as HTMLInputElement).value

    const newArr = searchedUsersFullInfo.filter((user) => {
      return user.name === inputValue
    })

    await updateDoc(doc(db, "Users", newArr[0].uid), {
      pendingInvites: arrayUnion(invitation)
    });

    //TODO add string into own event list??
    //if user accepts invite, add to own accepted invite array
  }


  return (
    <Box sx={{ placeSelf: 'center', alignContent: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Select Meeting Date"
            value={newMeetingDate}
            minDate={new Date()}
            onChange={(meetupDate: any) => {
              let meet = meetupDate.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
              setNewMeetingDate(meet);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <Autocomplete
          disablePortal
          id="participanttext"
          options={searchedUsers}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Invitee" />}
        />

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

        <Autocomplete
          disablePortal
          id="choosestudygroup"
          options={roomsDropdown}
          sx={{ width: 230 }}
          inputValue={selectedStudyGroup}
          onInputChange={(event, group: any) => {
            setSelectedStudyGroup(group)
          }}
          renderInput={(params) => <TextField {...params} label="Choose Study Group"
          />}
        />

      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" sx={{ width: '230px', height: '50px' }} onClick={() => { sendInviteToParticipant(); setNewMeetingDate(new Date().toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })); setTime(''); setSelectedStudyGroup('') }}>Submit</Button>

      </Box>
    </Box>
  );

}