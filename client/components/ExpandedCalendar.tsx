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
} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';

export default function ExpandedCalendar() {

  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [events, setEvents] = React.useState<Array<string>>(['meetup with Richard at 1pm', 'meetup with Tobin at 6pm']);

  const renderEvents = () => (
    <ul>
      {events.map((event, idx) => (
        <li key={idx}>{event}</li>
      ))}
    </ul>
  )

  return (
    <Box sx={{ width: '50%' }}>
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
      <Typography variant="h4">Schedule Meeting</Typography>

      {selectedDate.toDateString() === (new Date()).toDateString() ?
        <Typography variant="h4">Today's Events</Typography>
        :
        <Typography variant="h4">{selectedDate.toLocaleString('default', { month: 'long', day: 'numeric' })} Events</Typography>
      }

      {events.length === 0 ?
        <Typography>No meet ups scheduled today</Typography>
        : renderEvents()
      }
    </Box>
  );
}