import * as React from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { Box, TextField, Stack, List, ListItem, ListItemText, Typography, Paper, styled, Button, Tooltip, Avatar, Autocomplete } from '@mui/material';
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
  getDoc,
  arrayUnion
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ExpandedCalendar from "./ExpandedCalendar";
import { bgcolor, grid } from "@mui/system";

export default function GroupTabs({ userChats, showCalendar, setShowCalendar, currentRoom, setCurrentRoom }) {
  const db = getFirestore()
  const auth: any = getAuth();
  const userId = useAppSelector((state) => state.userId.value);

  const [messageInput, setMessageInput] = React.useState<string>("");
  const [userAddInput, setUserAddInput] = React.useState<string>("");

  const [value, setValue] = React.useState<any>(null);
  const [currentRoomChats, setCurrentRoomChats] = React.useState<any>([]);



  const userRooms = useAppSelector((state) => state.userRooms.value);
  // const userChats = useAppSelector((state) => state.userChats.value);
  //console.log('user rooms', userRooms)
  // console.log('user chats', userChats)



  const createRoomFunction = useAppSelector(
    (state) => state.globalFunctions.value.createRoom
  );

  const addUserToRoom = useAppSelector((state) => state.globalFunctions.value.addNewUserToRoom);

  const dispatch = useAppDispatch();

  const handleMessageInput = (messageBody) => {
    setMessageInput(messageBody);
  };
  const [fullListOfUsers, setFullListOfUsers] = React.useState([])
  const [searchedUsers, setSearchedUsers] = React.useState<string[]>([])
  const [searchedUsersFullInfo, setSearchedUsersFullInfo] = React.useState<any[]>([])
  const handleAddUserInput = async (userBody) => {
    //setUserAddInput(userBody);



      const q = query(collection(db, "Users"));
      const Users: any = await getDocs(q);

      console.log('searchedUsers', searchedUsers)

    const Usersarr: string[] = [];
    const UsersFullInfo: any[] = []
    Users.forEach((user: any) => {
      console.log('user.data().name', user.data().name)
      if (user.data().name) {
        const userName: string = user.data().name
        Usersarr.push(userName)
        UsersFullInfo.push(user.data())
      }

    })
    setSearchedUsersFullInfo(UsersFullInfo)
    setSearchedUsers(Usersarr)
    console.log('users that match the current search', searchedUsers)
  };

  React.useEffect(() => {
    handleAddUserInput('')
  }, [])

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
          //console.log('THIS IS THE VALUE OF THE CURRENT ROOM', currentRoom)
          const newChat = await addDoc(collection(db, "Rooms", currentRoom, "Chats"), {
            Message: messageInput,
            MessageMediaContent: mediaContent,
            Sender: user.uid,
            Name: user.displayName,
            Avatar: user.photoURL,
            TimeStamp: chatID,
            MessageThread: []
          });
          //console.log('newChat', newChat)
        }
        sendMessageOnceAuthorized()
      }
    })

  }

  const searchedForMatchedUsers = async () => {// this function will search for users when the input field changes
  }

  const addUserToCurrentRoom = async () => {
    const inputValue = (document.getElementById('usersSearch') as HTMLInputElement).value
    console.log('searchedUsersFullInfo', searchedUsersFullInfo)
    console.log('inputValue', inputValue)
    const newArr = searchedUsersFullInfo.filter((user) =>{
      return user.name === inputValue
    })

    await setDoc(doc(db, "Rooms", currentRoom), {
      RoomParticipants: arrayUnion(newArr[0].uid)
    }, { merge: true });
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(.2),
    textAlign: 'left',
    color: theme.palette.text.secondary
  }));

  const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#D3D3D3',
    ...theme.typography.body2,
    padding: theme.spacing(.2),
    textAlign: 'right',
    color: theme.palette.text.secondary,
    border: '0px'
  }));

  const SearchResults = () => {
    return (
      <Autocomplete
        disablePortal
        id="usersSearch"
        options={searchedUsers}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search Users" />}
      />
    );
  }
  // onChange={(e: React.ChangeEvent<HTMLInputElement>): any => {
  //   e.preventDefault();
  //   handleAddUserInput(e.target.value)
  // }
  // }

  if (showCalendar) {
    return (
      <ExpandedCalendar setShowCalendar={setShowCalendar} />
    )
  } else {
    return (
      <Box sx={{ width: "100%", height: '95%', typography: "body1" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", display: 'grid', gridTemplateColumns: '15% 30% 30% 25%', height: '50px' }}>
          <Typography sx={{ alignSelf: 'center', justifySelf: 'center' }} variant="h5" gutterBottom component="div">
            {currentRoom}
          </Typography>
          <SearchResults />
          {/* <input id="test"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>): any =>
              handleAddUserInput(e.target.value)
            }
          ></input> */}
          {/* <List>
            {searchedUsers.length > 0 ? searchedUsers.map((user, index) => {
              return (
                <ListItem value={user}>
                  <ListItemText primary={user}></ListItemText>
                </ListItem>
              )
            }) : null}
          </List> */}
          <Button sx={{ width: '10%', alignSelf: 'end' }} onClick={addUserToCurrentRoom}>Add User</Button>
        </Box>
        <Box sx={{ height: '100%', overflow: 'scroll', display: 'flex', flexDirection: 'column-reverse' }}>
          <Stack>
            {userChats ? userChats.map((message, index) => {
              if (message.Sender === userId) {
                if (message?.TimeStamp) {
                  let date = message.TimeStamp.toDate();
                }

                //console.log('date', date);
                return (
                  <Tooltip title="Reply" placement="bottom-end" key={index}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '95% 5%', bgcolor: '#D3D3D3' }}>
                      <Stack>
                        <Item2>{message.Name}</Item2>
                        <Item2>{message.Message}</Item2>
                        {/* <Item2>{date}</Item2> */}
                      </Stack>
                      <Avatar sx={{ width: 32, height: 32, alignSelf: 'center', justifySelf: 'center' }} src={message.Avatar} imgProps={{ referrerPolicy: 'noReferrer' }}></Avatar>
                    </Box>
                  </Tooltip>
                )
              } else {
                if (message?.TimeStamp) {
                  let date = message.TimeStamp.toDate();
                }

                //console.log('date', date);
                return (
                  <Tooltip title="Reply" placement="bottom-start" key={index}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '5% 95%' }}>
                      <Avatar sx={{ width: 32, height: 32, alignSelf: 'center', justifySelf: 'center' }} src={message.Avatar} imgProps={{ referrerPolicy: 'noReferrer' }}></Avatar>
                      <Stack>
                        <Item>{message.Name}</Item>
                        <Item>{message.Message}</Item>
                        {/* <Item>{date}</Item> */}
                      </Stack>
                    </Box>
                  </Tooltip>
                )
              }
            }) : null}
          </Stack>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <TextField sx={{ width: '90%' }} id="outlined-basic" label="Message" variant="outlined" onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            handleMessageInput(e.target.value)
          } />
          <Button sx={{ width: '40px' }} onClick={sendMessageToCurrentRoom}>Send</Button>
        </Box >
      </Box>
    );
  }

}
