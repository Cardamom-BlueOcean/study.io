import * as React from "react";
//import { fakeData } from './fakeGroupData';
import { useAppSelector, useAppDispatch } from "../hooks";
import { Box, Tab, TextField, Stack } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { fakeData } from './fakeGroupData';
import { group } from 'console';

export default function GroupTabs() {
  const [value, setValue] = React.useState<string>("javascript");
  const [roomInput, setRoomInput] = React.useState<string>("");

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  const userRooms = useAppSelector((state) => state.userRooms.value);
  const createRoomFunction = useAppSelector(
    (state) => state.globalFunctions.value.createRoom
  );
  const dispatch = useAppDispatch();

const [groups, setGroups] = React.useState(fakeData);
const handleRoomInput = (value) => {
    setRoomInput(value);
  };

  const handleCreateRoom = () => {
    createRoomFunction(roomInput);
  };

  // console.log("I am in group tabs :)", userRooms);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {groups.map((group, i) => (
              < Tab key={i} label={group.groupName} value={group.groupName} />
            ))}
          </TabList>
        </Box>
        <Box sx={{ height: '700px', overflow: 'scroll' }}>
          {groups.map((group, i) => (
            < TabPanel key={i} value={group.groupName}>
              {group.messages.map((message, i) => (
                <Stack spacing={1}>
                  <Box>{message.userName}</Box>
                  <Box>{message.body}</Box>
                  <Box>{message.date}</Box>
                </Stack>))}
            </TabPanel>
          ))}
        </Box>
      </TabContext>
      <input id="test"
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          handleRoomInput(e.target.value)
        }
      ></input>
      <button onClick={handleCreateRoom}>Add New Room</button>
      <Box
      component="form"
        sx={{
          '& > :not(style)': { m: 0, width: '100%' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Message" variant="outlined" />
      </Box>
    </Box>
  );
}
