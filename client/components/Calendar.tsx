import * as React from 'react';
import styled from 'styled-components';
import CalendarModal from './CalendarModal';
import {
  Box,
  CssBaseline,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";

// const Reminder = styled.div`
//   height: 500px;
//   width: 300px;
//   border: 3px solid black;
// `

export default function Calendar() {

  const [openCalendarModal, setOpenCalendarModal] = React.useState<boolean>(false);

  return (
    <Box>


      {openCalendarModal}
      <CalendarModal />
    </Box>
  );
}