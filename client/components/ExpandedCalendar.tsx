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

  //if selectedDate is not the same as


  React.useEffect(() => {
    setEvents(['events on selected date'])
  }, [selectedDate])

  return (
    <Box sx={{ width: '50%' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker<Date>
          orientation="portrait"
          openTo="day"
          value={selectedDate}
          // shouldDisableDate={isWeekend}
          onChange={(newDate: any) => {
            setSelectedDate(newDate);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        {/* <CalendarPicker date={selectedDate} onChange={(newDate) => setSelectedDate(newDate)} /> */}
      </LocalizationProvider>

      <Typography variant="h4">Today's Events</Typography>

      {events.length === 0 ?
        <Typography>No meet ups scheduled today</Typography>
        : events.map((event, idx) => (
          <Box key={idx}>{event}</Box>
        ))
      }
    </Box>
  );
}