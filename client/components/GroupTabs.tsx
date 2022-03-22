import * as React from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { Box, Tab, TextField, Stack } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
//import { group } from 'console';
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  setDoc,
  serverTimestamp,
  addDoc,
  getDocs,
  getDoc
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function GroupTabs({ practice, userChats }) {
  const db = getFirestore()
  const auth: any = getAuth();

  const [messageInput, setMessageInput] = React.useState<string>("");
  const [userAddInput, setUserAddInput] = React.useState<string>("");



  const userRooms = useAppSelector((state) => state.userRooms.value);
  // const userChats = useAppSelector((state) => state.userChats.value);
  console.log('user chats', userChats)
  console.log('practice', practice)

  const createRoomFunction = useAppSelector(
    (state) => state.globalFunctions.value.createRoom
  );
  const addUserToRoom = useAppSelector((state) => state.globalFunctions.value.addNewUserToRoom);
  const [value, setValue] = React.useState<string>('algebra');

  const handleChange = (event: any, newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };
  const dispatch = useAppDispatch();

  const handleMessageInput = (messageBody) => {
    setMessageInput(messageBody);
  };

  const handleAddUserInput = (userBody) => {
    setUserAddInput(userBody);
  };

  // console.log("I am in group tabs :)", userRooms);
  const [mediaContent, setMediaContent] = React.useState([])
  const sendMessageToCurrentRoom = async () => {


    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        // const timesent: Date = new Date();
        const chatID = serverTimestamp()
        const sendMessageOnceAuthorized = async () => {
          const newChat = await addDoc(collection(db, "Rooms", value, "Chats"), {
            Message: messageInput,
            MessageMediaContent: mediaContent,
            Sender: user.uid,
            TimeStamp: chatID,
            MessageThread: []
          });

          console.log('newChat', newChat)

        }
        sendMessageOnceAuthorized()
      }
    })

  }
  const [searchedUsers, setSearchedUsers] = React.useState<string[]>([])
  const searchedForMatchedUsers = async () => {// this function will search for users when the input field changes
    const q = query(collection(db, "Users"));
    const Users = await getDocs(q);
    const matchedUsers: string[] = [];
    Users.forEach((user) => {
      const userName: string = user.data().name
      if (userAddInput.toLocaleLowerCase().indexOf(userName.toLowerCase()) !== -1) {
        matchedUsers.push(userName)
      }
    })
    setSearchedUsers(matchedUsers)
    console.log('users that match the current search', searchedUsers)
  }

  const addUserToCurrentRoom = async () => {
    const q: any = query(collection(db, "Users"), where("name", '==', userAddInput));
    const userToAdd = await getDoc(q);
    addUserToRoom(userToAdd.data(), value, db)
  }

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}></Box>
        <input id="test"
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            handleAddUserInput(e.target.value)
          }
        ></input>
        <button onClick={addUserToCurrentRoom}>Add User</button>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          {userRooms.map((group, i) => (
            < Tab key={i} label={group} value={group} />
          ))}
        </TabList>
        {/* <Box sx={{ height: '500px', overflow: 'scroll', display: 'flex', flexDirection: 'column-reverse' }}>
          {userRooms.map((group, i) => (
            < TabPanel key={group.Timestamp} value={group}>
              {practice.english.map((message, i) => (
                <Stack spacing={1}>
                  <Box>{message.Sender}</Box>
                  <Box>{message.Message}</Box>
                  <Box>{message.Timestamp.toDate()}</Box>
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
