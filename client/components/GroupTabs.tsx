import * as React from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setUserList, setUserInfo } from '../features/users/users';
import { setMediaUrl } from '../features/mediaUrl/mediaUrl';
import { Box, TextField, Stack, Typography, Button, styled } from '@mui/material';
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
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ExpandedCalendar from "./ExpandedCalendar";
import UserChatMessage from './UserChatMessage';
import OtherChatMessage from './OtherChatMessage';
import SearchUserToAdd from './SearchUserToAdd';
import VideoChat from "./videoChat/VideoChat";
import VideocamIcon from '@mui/icons-material/Videocam';
import $ from "jquery";
import { UnpublishedOutlined, Send as SendIcon, UploadFile as UploadFileIcon, AddPhotoAlternateOutlined as AddPhotoAlternateOutlinedIcon } from "@mui/icons-material";

export default function GroupTabs({ userChats, showCalendar, setShowCalendar, setCurrentRoom, currentRoom, currentUserName }) {

  const db = getFirestore();
  const auth: any = getAuth();
  const userId = useAppSelector((state) => state.userId.value);
  const dispatch = useAppDispatch();

  const [messageInput, setMessageInput] = React.useState<string>("");
  const [fullListOfUsers, setFullListOfUsers] = React.useState([]);
  const [searchedUsers, setSearchedUsers] = React.useState<string[]>([]);
  const [searchedUsersFullInfo, setSearchedUsersFullInfo] = React.useState<any[]>([]);
  const [videoToggle, setVideoToggle] = React.useState(false);


  //console.log(userChats);
  // const mediaContent = useAppSelector((state) => state.mediaUrl.value)
  // console.log('at component level, ', mediaContent);
  // const dispatch = useAppDispatch();

  React.useEffect(() => {
    handleAddUserInput('')
  }, [])

  // console.log('searched users:', searchedUsers, 'full info:', searchedUsersFullInfo);
  const handleMessageInput = (messageBody) => {
    setMessageInput(messageBody);
  };

  const handleAddUserInput = async (userBody) => {
    const q = query(collection(db, "Users"));
    const Users: any = await getDocs(q);
    const Usersarr: string[] = [];
    const UsersFullInfo: any[] = []
    Users.forEach((user: any) => {
      //console.log('user.data().name', user.data().name)
      if (user.data().name) {
        const userName: string = user.data().name
        Usersarr.push(userName)
        UsersFullInfo.push(user.data())
      }
    })
    setSearchedUsersFullInfo(UsersFullInfo);
    setSearchedUsers(Usersarr);
    dispatch(setUserList(Usersarr));
    dispatch(setUserInfo(UsersFullInfo));
  };

  let randomUrl = '';
  const sendMessageToCurrentRoom = async () => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        // const timesent: Date = new Date();
        const chatID = serverTimestamp()
        const sendMessageOnceAuthorized = async () => {
          const newChat = await addDoc(collection(db, "Rooms", currentRoom, "Chats"), {
            Message: messageInput,
            MessageMediaContent: randomUrl,
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
    setCurrentRoom('General');
  }

  const storage = getStorage();
  const imagesRef = ref(storage, (Math.random() * 1000000).toString());

  const UploadPhotoToStorage = (file) => {
    let photo = document.getElementById("photo-to-upload").files[0];
    console.log('trying')
    uploadBytes(imagesRef, photo)
      .then((snapshot) => {
        console.log('uploaded file!');
        getImage();
      });
  }

  const getImage = () => {
    let locationUrl = getDownloadURL(imagesRef)
      .then((url) => {
        randomUrl = url;
      })
      .then(() => {
        sendMessageToCurrentRoom()
      })
      .then(() => randomUrl = '');
  }

  const Input = styled('input')({
    display: 'none',
  });

  $("#messageEntry").unbind().keyup(async function (event) {
    if (event.keyCode === 13) {
      //$("#sendMessageButton").click();
      await sendMessageToCurrentRoom()
      $('#messageEntry').val("");
    }
  });

  const handleSendButton = async function () {
    await sendMessageToCurrentRoom()
    $('#messageEntry').val("");
  }

  const UploadPhoto = () => {
    return (
      <Stack direction="row" alignItems="center" spacing={2}>
        <label htmlFor="photo-to-upload">
          <Input accept="image/*" id="photo-to-upload" multiple type="file" onChange={UploadPhotoToStorage} />
          <Button component="span">
            <UploadFileIcon />
          </Button>
        </label>
      </Stack>
    );
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
      <Box className="animate__animated animate__fadeIn" sx={{ width: "99%", height: '82%', typography: "body1", margin: '8px' }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", display: 'grid', gridTemplateColumns: '25% 10% 30% 20% 15%', height: '65px' }}>
          <Typography color="primary.main" sx={{ alignSelf: 'center', justifySelf: 'center', gridColumnStart: '1' }} variant="h5" gutterBottom component="div">
            {currentRoom}
          </Typography>
          <Button variant="outlined" sx={{ marginBottom: '8px', marginRight: '5px', height: '55.98px' }}>
            <VideocamIcon sx={{ width: '100%', justifySelf: 'center', gridColumnStart: '2' }} onClick={() => { setVideoToggle(!videoToggle) }} />
          </Button>
          <SearchUserToAdd sx={{ width: '10%', justifySelf: 'center', gridColumnStart: '3' }} searchedUsers={searchedUsers} />

          <Button variant="outlined" sx={{ width: '90%', justifySelf: 'center', gridColumnStart: '4', marginBottom: '8px', height: '55.98px' }} onClick={addUserToCurrentRoom}>Add User</Button>
          <Button variant="outlined" sx={{ width: '80%', justifySelf: 'center', gridColumnStart: '5', marginBottom: '8px', height: '55.98px' }} onClick={LeaveCurrentRoom}>Leave</Button>

        </Box>
        <Box sx={{ height: '100%', overflow: 'scroll', display: 'flex', flexDirection: 'column-reverse', marginTop: '3px' }}>
          {videoToggle ? <VideoChat currentRoom={currentRoom} currentUserName={currentUserName} setVideoToggle={setVideoToggle} /> : <Stack>
            {userChats ? userChats.map((message, index) => {
              if (message.Sender === userId) {
                //console.log('date', date);
                return (
                  <UserChatMessage replyToThread={replyToThread} key={index} message={message} />
                )
              } else {
                //console.log('date', date);
                return (
                  <OtherChatMessage replyToThread={replyToThread} key={index} message={message} />
                )
              }
            }) : null}
          </Stack>}
        </Box>
        {!videoToggle && <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <TextField sx={{ width: '90%' }} id="messageEntry" label="Message" variant="outlined" margin="none" size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            handleMessageInput(e.target.value)
          } />
          <Button sx={{ width: '40px' }} onClick={handleSendButton} id="sendMessageButton"><SendIcon /></Button>
          <Button ><AddPhotoAlternateOutlinedIcon /></Button>
          <UploadPhoto />
        </Box >}
      </Box >
    );

  }
}
