import * as React from 'react';
import 'date-fns';
import { alpha } from '@material-ui/core/styles'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import TextField from '@mui/material/TextField';
import {
  Box,
  ThemeProvider,
  Typography,
  Button,
} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function ExpandedCalendar({ setShowCalendar }) {

  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [events, setEvents] = React.useState<Array<string>>(['meetup with Richard at 1pm', 'meetup with Tobin at 6pm']);

  //add meeting stuff
  const [show, setShow] = React.useState<boolean>(false);
  const [scheduledMeeting, setScheduleMeeting] = React.useState<boolean>(false);

  const renderEvents = () => (
    <ul>
      {events.map((event, idx) => (
        <li key={idx}>{event}</li>
      ))}
    </ul>
  )

  return (
    <Box sx={{ width: '100%' }}>

      <Button variant="text" onClick={() => setShowCalendar(false)}><ArrowBackIcon />
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
      <Box sx={{ display: 'grid', justifyContent: 'center' }}>
        <Button variant="outlined" sx={{ width: '500px' }} onClick={() => { setScheduleMeeting(prev => !prev) }}>Schedule Meeting</Button>
        {scheduledMeeting ? <Typography variant="h4">do stuff</Typography> : null}
      </Box>

      <Box sx={{ display: 'grid', justify: 'center' }}>
        {selectedDate.toDateString() === (new Date()).toDateString() ?
          <Typography variant="h4">Today's Events</Typography>
          :
          <Typography variant="h4">{selectedDate.toLocaleString('default', { month: 'long', day: 'numeric' })} Events</Typography>
        }
      </Box>
      {
        events.length === 0 ?
          <Typography>No meet ups scheduled today</Typography>
          : renderEvents()
      }

    </Box >
  );
}