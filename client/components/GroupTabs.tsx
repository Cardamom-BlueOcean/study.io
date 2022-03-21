import * as React from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
//import { fakeData } from './fakeGroupData';
import { useAppSelector, useAppDispatch } from "../hooks";

export default function GroupTabs() {
  const [value, setValue] = React.useState<string>("1");
  const [roomInput, setRoomInput] = React.useState<string>("");

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  const userRooms = useAppSelector((state) => state.userRooms.value);
  const createRoomFunction = useAppSelector(
    (state) => state.globalFunctions.value.createRoom
  );
  const dispatch = useAppDispatch();

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
            <Tab label="Javascript" value="1" />
            <Tab label="Express" value="2" />
            <Tab label="Node" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
      <input
        id="test"
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          handleRoomInput(e.target.value)
        }
      ></input>
      <button onClick={handleCreateRoom}>Add New Room</button>
    </Box>
  );
}
