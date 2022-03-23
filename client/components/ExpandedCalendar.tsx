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


export default function ExpandedCalendar({ setShowCalendar }) {

  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [events, setEvents] = React.useState<Array<string>>(['Meeting with John at 2pm to study Python', 'Meeting with Tobin at 5pm to study Firebase', 'Meeting with BJ at 6pm to study Material UI']);
  const [pending, setPending] = React.useState<Array<string>>(['Alex invited you to study Typescript tomorrow at 12pm', 'Richard invited you to study Redux March 24 at 1pm']);


  //add meeting stuff
  const [scheduledMeeting, setScheduleMeeting] = React.useState<boolean>(false);
  const [participant, setParticipant] = React.useState<string>('');


  const renderEvents = () => (
    <ul>
      {events.map((event, idx) => (
        <li key={idx}>{event}</li>
      ))}
    </ul>
  )

  const sendInvite = () => (
    <Box sx={{ placeSelf: 'center', alignContent: 'center' }}>
      {/* <Typography variant="h6">Select Meeting Date</Typography> */}
      <Box sx={{ display: 'flex' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}
        >

          <DesktopDatePicker

            label="Select Meeting Date"
            value={selectedDate}
            minDate={new Date('2017-01-01')}
            onChange={(newValue) => {
              setSelectedDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        {/* <Typography variant="h6">Enter Meeting Participant</Typography> */}
        <TextField
          id="outlined-name"
          label="Participant"
          value={participant}
          onChange={() => setParticipant(e.target.value)}
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
      <Divider variant="middle" />
      <Box sx={{ display: 'grid', justifyContent: 'center' }}>
        <Button variant="outlined"
          sx={{ width: '500px', marginTop: '20px', marginBottom: '20px' }}
          onClick={() => { setScheduleMeeting(prev => !prev) }}>Schedule Meeting</Button>
        {scheduledMeeting ? sendInvite() : null}


        <Box sx={{ placeSelf: 'center' }}>
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
        }
      </Box>
    </Box >
  );
}