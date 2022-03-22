import { useEffect, useState } from "react";
import GroupTabs from "./GroupTabs";
import GroupList from './GroupList'
import ReduxExample from "./redux-examples/reduxExample";
import AutreRedux from "./redux-examples/AutreRedux";
// import ReduxExample from "./redux-examples/reduxExample";
// import AutreRedux from "./redux-examples/AutreRedux";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  setDoc,
  orderBy
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setRoomsArray } from "../features/userRooms/userRooms";
import { setChatsObject, addToChatsObject } from '../features/userChats/userChats';
//Redux Imports Below:
import { Provider } from 'react-redux';
import { store } from '../store';
import Calendar from './Calendar';
import {
  Box,
  CssBaseline,
  Paper,
  Typography,
} from "@mui/material";
import logo from '../../src/logo.png'
import ExpandedCalendar from "./ExpandedCalendar";

type room = {
  RoomName: string;
  RoomParticipants: string[];
};

export default function UserPage() {
  const db = getFirestore();

  const userRooms = useAppSelector((state) => state.userRooms.value);
  // const userChats = useAppSelector((state) => state.userChats.value);
  const [practice, setPractice] = useState({});
  const dispatch = useAppDispatch();
  const objectWithRoomsAsKeysAndArraysOfChatsAsValues = {}
  const [userChats, setUserChats] = useState({});

  useEffect(() => {
    const asyncGetAuth = async () => {
      const auth: any = await getAuth();
      onAuthStateChanged(auth, (user: any) => {
        if (user) {
          const addUserDbIfUserIsNotAlreadyAdded = async () => {
            await setDoc(doc(db, "Users", user.uid), {
              name: user.displayName,
              email: user.email,
              thumbnailPhotoURL: user.photoURL,
              uid: user.uid,
              acceptedInvites: [],
              pendingInvites: [],
              rooms: []
            });
          };
          addUserDbIfUserIsNotAlreadyAdded();

        }
      });
    };
    asyncGetAuth();
  }, []);
  useEffect(() => {
    const dbQuerysAndSubscriptions = async () => {
      const auth: any = await getAuth();

      onAuthStateChanged(auth, (user) => {
        const getUsersRoomDataOnceAuthorized = async () => {
          //this is to get the room data
          if (user) {
            const UID = user.uid;
            const q = query(
              collection(db, "Rooms"),
              where("RoomParticipants", "array-contains", UID)
            );
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
              //this function is a listener for the Users Rooms. It will Update when there are new rooms that includes the user
              const Rooms: any = []; //this is where the rooms are stored
              querySnapshot.forEach((doc) => {
                Rooms.push(doc.data().RoomName);
                subsribeToUpdatesForARoom(doc.id);
              });
              console.log("ROOMS: ", Rooms);
              // updateUserRooms(Rooms);
              // dispatch to update global array here.
              setPractice(objectWithRoomsAsKeysAndArraysOfChatsAsValues);
              console.log('THIS IS THE BIG OBJECT', objectWithRoomsAsKeysAndArraysOfChatsAsValues) //this is where the function should go to update the chats
              dispatch(setRoomsArray(Rooms));
              setUserChats(objectWithRoomsAsKeysAndArraysOfChatsAsValues)

            });
          }
        };
        getUsersRoomDataOnceAuthorized();

        const subsribeToUpdatesForARoom = async (roomTolistenTO) => {
          //The function can be called to subscribe to a room in
          if (user) {
            const q = query(
              collection(db, "Rooms", roomTolistenTO, "Chats")
              , orderBy("TimeStamp")
            ); //
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
              const chats: any = [];
              querySnapshot.forEach((doc) => {
                chats.push(doc.data());
              });
              objectWithRoomsAsKeysAndArraysOfChatsAsValues[roomTolistenTO] = chats
              // console.log(`${roomTolistenTO} Chats: `, chats);
              // updateUserRooms(chats);
              // dispatch goes here
              // dispatch(addToChatsArray(chats));
            });
          }
        };
        //example of what a call to subsribe to a room would look like
      });
    };
    dbQuerysAndSubscriptions();
  }, []);

  // Everything within the provider tags below will have access to our global redux variables.
  // test

  //put hook for state change here

  return (
    <Box>
      <Box sx={{ backgroundColor: '#542F34' }}> <img src={logo} style={{ display: 'block', margin: 'auto' }}></img></Box>
      <Box className="loginbar" sx={{ border: 1, height: '40px', width: 8 / 10, margin: '20px auto' }}>Login bar</Box>
      <Box className="main" sx={{
        width: 8 / 10,
        height: 800,
        // border: 2,
        display: 'grid',
        margin: 'auto',
        columnGap: 2,
        gridTemplateColumns: '25% 75%',
        gridTemplateRows: 'auto'
      }}>
        <Box className="sidebar" sx={{ border: 1 }}>
          <GroupList />

          <Calendar />

        </Box>
        <Box className="chatview" sx={{ border: 1 }}>
          <GroupTabs practice={practice} userChats={userChats} />

        </Box>
      </Box>
      <ExpandedCalendar />
    </Box>
  );
}
