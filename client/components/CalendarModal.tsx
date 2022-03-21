import * as React from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { alpha } from '@material-ui/core/styles'

export default function CalendarModal() {

  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  }

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          label="Material Date Picker"
          value={selectedDate}
          onChange={handleDateChange}
        />


      </MuiPickersUtilsProvider>
    </div>
  );
}