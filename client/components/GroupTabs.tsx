import * as React from "react";
//import { fakeData } from './fakeGroupData';
import { useAppSelector, useAppDispatch } from "../hooks";
import { Box, Tab, TextField, Stack } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { fakeData } from './fakeGroupData';
import { group } from 'console';
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  setDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function GroupTabs() {
  const [value, setValue] = React.useState<string>('english');
  // ROOM INPUT MUST BE CHANGED TO MESSAGE INPUT
  const [messageInput, setMessageInput] = React.useState<string>("");
  const [groups, setGroups] = React.useState(fakeData);
  const handleChange = (event: any, newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };

  const userRooms = useAppSelector((state) => state.userRooms.value);
  const createRoomFunction = useAppSelector(
    (state) => state.globalFunctions.value.createRoom
  );
  const dispatch = useAppDispatch();

  const handleMessageInput = (messageBody) => {
    console.log(messageBody);
    setMessageInput(messageBody);
  };

  // const handleCreateRoom = () => {
  //   createRoomFunction(roomInput);
  // };

  // console.log("I am in group tabs :)", userRooms);
  const [mediaContent, setMediaContent] = React.useState([])
  const sendMessageToCurrentRoom = async () => {
    const db = getFirestore()
    const auth: any = await getAuth();

    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        // const timesent: Date = new Date();
        const test = 'Testing'
        const sendMessageOnceAuthorized = async () => {
          await setDoc(doc(db, "Rooms", value, "chats", test), {
            Message: messageInput,
            MessageMediaContent: mediaContent,
            Sender: user.uid,
            TimeStamp: new Date()
            //Replies: [],

          });

        }
        sendMessageOnceAuthorized()
      }
    })


  }

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {userRooms.map((group, i) => (
              < Tab key={i} label={group} value={group} />
            ))}
          </TabList>
        </Box>
        {/* <Box sx={{ height: '500px', overflow: 'scroll', display: 'flex', flexDirection: 'column-reverse' }}>
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
        </Box> */}
      </TabContext>
      <input id="test"
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          handleMessageInput(e.target.value)
        }
      ></input>
      <button onClick={sendMessageToCurrentRoom}>Add Message</button>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 0, width: '100%' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Message" variant="outlined" onSubmit={sendMessageToCurrentRoom} />
      </Box>
    </Box>
  );
}
