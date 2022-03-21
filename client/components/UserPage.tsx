import { useState } from "react";
import GroupTabs from "./GroupTabs";
// import ReduxExample from "./redux-examples/reduxExample";
// import AutreRedux from "./redux-examples/AutreRedux";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  doc,
  getDoc,
  orderBy,
} from "firebase/firestore";
import "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
//Redux Imports Below:
import { Provider } from 'react-redux';
import { store } from '../store';
import Calendar from './Calendar';
import {
  Box,
  CssBaseline,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";
import logo from '../../src/logo.png'

type room = {
  RoomName: string;
  RoomParticipants: string[];
};

export default function UserPage() {
  const db = getFirestore();
  const [userRooms, updateUserRooms] = useState<room[]>([]);

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
            const Rooms: any[] = []; //this is where the rooms are stored
            querySnapshot.forEach((doc) => {
              console.log("doc", doc);
              Rooms.push(doc.data());
            });
            console.log("ROOMS: ", Rooms);
            // updateUserRooms(Rooms);
          });
        }
      };
      getUsersRoomDataOnceAuthorized();

      const subsribeToUpdatesForARoom = async (roomTolistenTO) => {
        //The function can be called to subscribe to a room in
        if (user) {
          const q = query(
            collection(db, "Rooms", roomTolistenTO, "Chats"),
            orderBy("TimeStamp")
          ); //
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const chats: any[] = [];
            querySnapshot.forEach((doc) => {
              chats.push(doc.data());
            });
            console.log("Chats: ", chats);
            // updateUserRooms(chats);
          });
        }
      };
      subsribeToUpdatesForARoom("NAJXCCti8U4JWU9k7nnZ"); //example of what a call to subsribe to a room would look like
    });
  };
  dbQuerysAndSubscriptions();

  // Everything within the provider tags below will have access to our global redux variables.
  // test

  return (
    <Box>
      <Box sx={{ backgroundColor: '#542F34' }}> <img src={logo} style={{ display: 'block', margin: 'auto' }}></img></Box>
      <Box className="loginbar" sx={{ border: 1, height: '40px', width: 8 / 10, margin: '20px auto' }}>Login bar</Box>
      <Box sx={{
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
          <Box className="grouplist" sx={{ height: '60%', border: 1 }}></Box>
          <Calendar />

        </Box>
        <Box className="chatview" sx={{ border: 1 }}>
          <GroupTabs />

        </Box>

      </Box>
    </Box>
  );
}
