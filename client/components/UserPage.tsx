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
  orderBy,
  updateDoc,
  arrayUnion,
  getDoc,
  QuerySnapshot
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setRoomsArray } from "../features/userRooms/userRooms";
import { setDMsArray } from "../features/userDMs/userDMs";
import { setUserId } from "../features/userId/userId";
import { setUserName } from '../features/userName/userName';

//import { setChatsObject, addToChatsObject } from '../features/userChats/userChats';
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
import logo2 from '../../src/logo2.png';
import pinklogo from '../../src/pinklogo.png';
import ExpandedCalendar from "./ExpandedCalendar";

type room = {
  RoomName: string;
  RoomParticipants: string[];
};

export default function UserPage(props) {
  const db = getFirestore();

  const userRooms = useAppSelector((state) => state.userRooms.value);
  // const userChats = useAppSelector((state) => state.userChats.value);

  const dispatch = useAppDispatch();
  const objectWithRoomsAsKeysAndArraysOfChatsAsValues = {}
  const [userChats, setUserChats] = useState([]);
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentRoom, setCurrentRoom] = useState<string>('General');
  const [showCalendar, setShowCalendar] = useState(false);
  const [logoImg, setLogoImg] = useState(false)
  //console.log(currentRoom);
  const [currentUserUID, setcurrentUserUID] = useState<any>(null);
  useEffect(() => {
    const asyncGetAuth = async () => {
      const auth: any = await getAuth();
      onAuthStateChanged(auth, (user: any) => {
        if (user) {
          setCurrentUserName(user.displayName);
          setcurrentUserUID(user.uid);
          const addToGeneral = async () => {
            await updateDoc(doc(db, "Rooms", "General"),
              { RoomParticipants: arrayUnion(user.uid) })
          }
          addToGeneral();

          const addUserDbIfUserIsNotAlreadyAdded = async () => {
            const ref = doc(db, "Users", user.uid)
            dispatch(setUserId(user.uid));
            dispatch(setUserName(user.displayName));
            const userDoc = await getDoc(ref);
            if (!userDoc.data()) {
              await setDoc(doc(db, "Users", user.uid), {
                name: user.displayName,
                email: user.email,
                thumbnailPhotoURL: user.photoURL,
                uid: user.uid,
                acceptedInvites: [],
                pendingInvites: [],
                rooms: []
              }, { merge: true });
              await updateDoc(doc(db, "Rooms", "General"),
                { RoomParticipants: arrayUnion(user.uid) })
            }
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
      const objectWithRoomsAsKeysAndArraysOfChatsAsValues = {}
      onAuthStateChanged(auth, (user) => {
        const getUsersRoomDataOnceAuthorized = async () => {
          //this is to get the room data
          if (user) {
            const UID = user.uid;
            const q = query(
              collection(db, "Rooms"),
              where("RoomParticipants", "array-contains", UID),
              where("DM", '==', false)
            );
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
              //this function is a listener for the Users Rooms. It will Update when there are new rooms that includes the user
              const Rooms: any = []; //this is where the rooms are stored
              querySnapshot.forEach((doc) => {
                Rooms.push(doc.data().RoomName);
              });

              //console.log("ROOMS: ", Rooms);
              // updateUserRooms(Rooms);
              // dispatch to update global array here.
              //console.log('THIS IS THE BIG OBJECT', objectWithRoomsAsKeysAndArraysOfChatsAsValues) //this is where the function should go to update the chats
              dispatch(setRoomsArray(Rooms));
              // setUserChats(objectWithRoomsAsKeysAndArraysOfChatsAsValues)

            });
          }
        };
        const getUsersDMData = async () => {
          if (user) {
            const dmquery = query(
              collection(db, "Rooms"),
              where("RoomParticipants", "array-contains", user.uid),
              where("DM", "==", true)
            );
            const unsubscribe = onSnapshot(dmquery, (querySnapshot) => {
              const DMs: any = [];
              querySnapshot.forEach((doc) => {
                DMs.push(doc.data().RoomName)
              });
              dispatch(setDMsArray(DMs));
            });
          }
        };
        getUsersRoomDataOnceAuthorized();
        getUsersDMData();

        //example of what a call to subsribe to a room would look like
      });
    };
    dbQuerysAndSubscriptions();
  }, []);

  // Everything within the provider tags below will have access to our global redux variables.
  // test

  //put hook for state change here

  return (
    <Box className="animate__animated animate__slideInUp " sx={{
      marginBottom: '50px', fontFamily: "Montserrat, sans-serif"
    }}>
      <Box backgroundColor="primary.main"> <img src={!logoImg ? logo2 : pinklogo} style={{ display: 'block', margin: 'auto' }}></img></Box>

      <Box className="main" sx={{
        width: 8 / 10,
        height: 800,
        display: 'grid',
        margin: 'auto',
        columnGap: 2,
        gridTemplateColumns: '25% 75%',
        gridTemplateRows: 'auto',
        marginTop: '30px'
      }}>
        <Box className="sidebar" sx={{ border: '1px solid #542F34', maxHeight: '800px', boxShadow: '0 8px 6px -6px #542F34', }}>
          <GroupList setUserChats={setUserChats} currentRoom={currentRoom} setCurrentRoom={setCurrentRoom} toggleDark={props.toggleDark} settoggleDark={props.settoggleDark} currentMode={props.currentMode} setShowCalendar={setShowCalendar} mode={props.mode} setMode={props.setMode} setLogoImg={setLogoImg} logoImg={logoImg} />
          <Calendar setShowCalendar={setShowCalendar} />
        </Box>
        <Box className="chatview" sx={{ border: '1px solid #542F34', maxHeight: '800px', boxShadow: '0 8px 6px -6px #542F34' }}>
          <GroupTabs userChats={userChats} showCalendar={showCalendar} setShowCalendar={setShowCalendar} setCurrentRoom={setCurrentRoom} currentRoom={currentRoom} currentUserName={currentUserName} />
        </Box>
      </Box>


    </Box >
  );
}
