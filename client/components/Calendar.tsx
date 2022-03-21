import * as React from 'react';
import styled from 'styled-components';
import CalendarModal from './CalendarModal';
import {
  Box,
  CssBaseline,
  Paper,
  ThemeProvider,
  Typography,
  Button,
} from "@mui/material";

// const Reminder = styled.div`
// height: 500px;
// width: 300px;
// border: 3px solid black;
// `

export default function Calendar() {

  const [openCalendarModal, setOpenCalendarModal] = React.useState<boolean>(false);
  const [accepted, setAccepted] = React.useState<Array<string>>([]);
  const [pending, setPending] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    setAccepted(['meeting with john', 'meeting with bj']);
    setPending(['meeting with alex']);
  }, [])

  return (
    <Box
      sx={{
        // height: 300,
        // width: 300,
        // border: 1,
      }}>
      <Typography variant="h4">Today's Scheduled Events</Typography>
      <Typography variant="h6">Accepted Invites</Typography>
      {accepted.map((meeting, idx) => (
        <Box key={idx} >{meeting} </Box>
      ))}
      <Typography variant="h6">Pending Invites</Typography>
      {pending.map((meeting, idx) => (
        <Box key={idx} >{meeting} </Box>
      ))}
      {/* TODO button onclick, rerender chat view to show calendar */}
      <Button variant="contained">Show Calendar</Button>
      {/* {openCalendarModal}
      <CalendarModal /> */}
    </Box>
  );
}