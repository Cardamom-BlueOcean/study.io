import * as React from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { Box, TextField, Stack, Typography, Button } from '@mui/material';
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
  arrayUnion,
  arrayRemove,
  updateDoc
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ExpandedCalendar from "./ExpandedCalendar";
import UserChatMessage from './UserChatMessage';
import OtherChatMessage from './OtherChatMessage';
import SearchUserToAdd from './SearchUserToAdd';

export default function GroupTabs({ userChats, showCalendar, setShowCalendar, currentRoom }) {

  const db = getFirestore();
  const auth: any = getAuth();
  const userId = useAppSelector((state) => state.userId.value);

  const [messageInput, setMessageInput] = React.useState<string>("");
  const [fullListOfUsers, setFullListOfUsers] = React.useState([]);
  const [searchedUsers, setSearchedUsers] = React.useState<string[]>([]);
  const [searchedUsersFullInfo, setSearchedUsersFullInfo] = React.useState<any[]>([]);
  const [mediaContent, setMediaContent] = React.useState([]);

  React.useEffect(() => {
    handleAddUserInput('')
  }, [])

  const handleMessageInput = (messageBody) => {
    setMessageInput(messageBody);
  };

  const handleAddUserInput = async (userBody) => {
    const q = query(collection(db, "Users"));
    const Users: any = await getDocs(q);
    const Usersarr: string[] = [];
    const UsersFullInfo: any[] = []
    Users.forEach((user: any) => {
      // console.log('user.data().name', user.data().name)
      if (user.data().name) {
        const userName: string = user.data().name
        Usersarr.push(userName)
        UsersFullInfo.push(user.data())
      }
    })
    setSearchedUsersFullInfo(UsersFullInfo)
    setSearchedUsers(Usersarr)
  };

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
            Name: user.displayName,
            Avatar: user.photoURL,
            TimeStamp: chatID,
            MessageThread: []
          });
        }
        sendMessageOnceAuthorized()
      }
    })
  }

  const addUserToCurrentRoom = async () => {
    const inputValue = (document.getElementById('usersSearch') as HTMLInputElement).value
    const newArr = searchedUsersFullInfo.filter((user) => {
      return user.name === inputValue
    })
    await setDoc(doc(db, "Rooms", currentRoom), {
      RoomParticipants: arrayUnion(newArr[0].uid)
    }, { merge: true });
  }

  const LeaveCurrentRoom = async () => {
    await updateDoc(doc(db, "Rooms", currentRoom), {
      RoomParticipants: arrayRemove(userId)
    });
  }

  const replyToThread = async (chatId, replyBody) => {
    await updateDoc(doc(db, "Rooms", currentRoom, "Chats", chatId), {
      MessageThread: arrayUnion(replyBody)
    })

  }

  if (showCalendar) {
    return (
      <ExpandedCalendar setShowCalendar={setShowCalendar} searchedUsers={searchedUsers} searchedUsersFullInfo={searchedUsersFullInfo} />
    )
  } else {
    return (
      <Box sx={{ width: "100%", height: '90%', typography: "body1" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", display: 'grid', gridTemplateColumns: '25% 40% 20% 15%', height: '65px' }}>
          <Typography sx={{ alignSelf: 'center', justifySelf: 'center' }} variant="h5" gutterBottom component="div">
            {currentRoom}
          </Typography>
          <SearchUserToAdd searchedUsers={searchedUsers} />
          <Button sx={{ width: '20%', justifySelf: 'center', gridColumnStart: '3' }} onClick={addUserToCurrentRoom}>Add User</Button>
          <Button sx={{ width: '20%', justifySelf: 'center', gridColumnStart: '4' }} onClick={LeaveCurrentRoom}>Leave</Button>
        </Box>
        <Box sx={{ height: '100%', overflow: 'scroll', display: 'flex', flexDirection: 'column-reverse', marginTop: '3px' }}>
          <Stack>
            {userChats ? userChats.map((message, index) => {
              if (message.Sender === userId) {
                if (message?.TimeStamp) {
                  let date = message.TimeStamp.toDate();
                }
                //console.log('date', date);
                return (
                  <UserChatMessage replyToThread={replyToThread} key={index} message={message} />
                )
              } else {
                if (message?.TimeStamp) {
                  let date = message.TimeStamp.toDate();
                }
                //console.log('date', date);
                return (
                  <OtherChatMessage replyToThread={replyToThread} key={index} message={message} />
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
