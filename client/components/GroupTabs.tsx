import * as React from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { Box, TextField, Stack, List, ListItem, ListItemText, Typography, Paper, styled, Button, Tooltip } from '@mui/material';
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
import ExpandedCalendar from "./ExpandedCalendar";

export default function GroupTabs({ userChats, showCalendar, setShowCalendar, currentRoom, setCurrentRoom }) {
  const db = getFirestore()
  const auth: any = getAuth();

  const [messageInput, setMessageInput] = React.useState<string>("");
  const [userAddInput, setUserAddInput] = React.useState<string>("");
  const [value, setValue] = React.useState<any>(null);
  const [currentRoomChats, setCurrentRoomChats] = React.useState<any>([]);



  const userRooms = useAppSelector((state) => state.userRooms.value);
  // const userChats = useAppSelector((state) => state.userChats.value);
  //console.log('user rooms', userRooms)
  console.log('user chats', userChats)



  const createRoomFunction = useAppSelector(
    (state) => state.globalFunctions.value.createRoom
  );

  const addUserToRoom = useAppSelector((state) => state.globalFunctions.value.addNewUserToRoom);

  const dispatch = useAppDispatch();

  const handleMessageInput = (messageBody) => {
    setMessageInput(messageBody);
  };

  const handleAddUserInput = (userBody) => {
    setUserAddInput(userBody);
  };

  React.useEffect(() => {
    if (userAddInput.length >= 3) {
      searchedForMatchedUsers();
    }
  }, [userAddInput])

  const [mediaContent, setMediaContent] = React.useState([])

  const sendMessageToCurrentRoom = async () => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        // const timesent: Date = new Date();
        const chatID = serverTimestamp()
        const sendMessageOnceAuthorized = async () => {
          const newChat = await addDoc(collection(db, "Rooms", currentRoom, "Chats"), {
            Message: messageInput,
            MessageMediaContent: mediaContent,
            Sender: user.uid,
            TimeStamp: chatID,
            MessageThread: []
          });
          //console.log('newChat', newChat)
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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(.5),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));

  const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(.5),
    textAlign: 'right',
    color: theme.palette.text.secondary,
  }));

  if (showCalendar) {
    return (
      <ExpandedCalendar setShowCalendar={setShowCalendar} />
    )
  } else {
    return (
      <Box sx={{ width: "100%", height: '600px', typography: "body1" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", display: 'inline-flex', height: '50px', gap: '100px' }}>
          <Typography variant="h5" gutterBottom component="div">
            {currentRoom}
          </Typography>
          <input id="test"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              handleAddUserInput(e.target.value)
            }
          ></input>
          <Button sx={{ alignSelf: 'end' }} onClick={addUserToCurrentRoom}>Add User</Button>
        </Box>
        <Box sx={{ height: '500px', overflow: 'scroll' }}>
          <Stack>
            {userChats ? userChats.map((message, index) => {
              if (message.Sender === 'x8lR3zV56bR0FpFjmKuhs3xbvPl1') {
                return (
                  <Tooltip title="Reply" placement="bottom-end">
                    <Stack>
                      <Item2>{message.Sender}</Item2>
                      <Item2>{message.Message}</Item2>
                      <Item2>{message.TimeStamp.seconds}</Item2>
                    </Stack>
                  </Tooltip>
                )
              } else {
                return (
                  <Tooltip title="Reply" placement="bottom-start">
                    <Stack>
                      <Item>{message.Sender}</Item>
                      <Item>{message.Message}</Item>
                      <Item>{message.TimeStamp.seconds}</Item>
                    </Stack>
                  </Tooltip>
                )
              }
            }) : null}
          </Stack>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <Box
            component="form"
            sx={{ m: 0, width: '80%', }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" label="Message" variant="outlined" onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              handleMessageInput(e.target.value)
            } />
          </Box>
          <Button sx={{ width: '40px' }} onClick={sendMessageToCurrentRoom}>Send</Button>
        </Box >
      </Box>
    );
  }

}
