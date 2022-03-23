import * as React from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { Box, TextField, Stack, List, ListItem, ListItemText, Typography } from '@mui/material';
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
  console.log('user rooms', userRooms)
  console.log('user chats', userChats)
  //console.log('practice', practice)

  React.useEffect(() => {
    if (userRooms[0] !== undefined) {
      setValue(userRooms[0]);
      setCurrentRoom(userRooms[0]);
    }
  }, [userRooms])

  React.useEffect(() => {
    if (value !== null) {
      //console.log(value);
      //console.log(typeof (value));
      //console.log(userChats.english);
      setCurrentRoomChats(userChats.english);
    }
  }, [value])

  React.useEffect(() => {
    //console.log('userChats now', userChats);
    let current = value;
    //console.log(current);
    if (current !== undefined) {
      //console.log('yay');
      //console.log(typeof (value));
      //console.log('here', userChats.english);
      setCurrentRoomChats(userChats.english);
    }
  }, [userChats[value]])

  const createRoomFunction = useAppSelector(
    (state) => state.globalFunctions.value.createRoom
  );

  const addUserToRoom = useAppSelector((state) => state.globalFunctions.value.addNewUserToRoom);


  const dispatch = useAppDispatch();

  const handleMessageInput = (messageBody) => {
    setMessageInput(messageBody);
    //console.log(userChats.english);
  };

  const handleAddUserInput = (userBody) => {
    setUserAddInput(userBody);
  };

  const [mediaContent, setMediaContent] = React.useState([])

  const sendMessageToCurrentRoom = async () => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        // const timesent: Date = new Date();
        const chatID = serverTimestamp()
        const sendMessageOnceAuthorized = async () => {
          console.log('THIS IS THE VALUE OF THE CURRENT ROOM', currentRoom)
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

  if (showCalendar) {
    return (
      <ExpandedCalendar setShowCalendar={setShowCalendar} />
    )
  } else {
    return (
      <Box sx={{ width: "100%", typography: "body1" }}>
        <h1>{value}</h1>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}></Box>
        <input id="test"
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            handleAddUserInput(e.target.value)
          }
        ></input>
        <button onClick={addUserToCurrentRoom}>Add User</button>
        <Box>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {userChats?.map((message, i) => {
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary=" "
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >

                      </Typography>
                      {message.Message}
                    </React.Fragment>
                  }
                />
              </ListItem>
            })}
          </List>
        </Box>

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

}
