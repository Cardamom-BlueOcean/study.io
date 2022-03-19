<<<<<<< HEAD
import { useState, useEffect } from "react";
// import GroupTabs from "./GroupTabs";
import { getAuth } from "firebase/auth";
import Test from './test'
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  where
} from "firebase/firestore";
=======
import * as React from 'react';
import GroupTabs from './GroupTabs';
import ReduxExample from './reduxExample';
import AutreRedux from './AutreRedux';
//Redux Imports Below:
import { Provider } from 'react-redux';
import { store } from '../store';



>>>>>>> 8980804c5f498c1204542988e91fc26676b94fcf

export default function UserPage() {
  // const auth = getAuth();
  // const db = getFirestore();
  // const [userRooms, updateUserRooms] = useState([]);

  // // const unsubToUserData = onSnapshot(doc(db, "Users", "auth.currentUser.uid"), { includeMetadataChanges: true }, (doc) => {
  // //   console.log("Current data: ", doc.data());
  // //   const userData = doc.data();
  // //   updateUserRooms(userData.rooms);
  // // });
  // const roomsRef = collection(db, "Rooms");
  // const q = query(roomsRef, where("Users", "array-contains", auth.currentUser.uid));
  // const unsubscribeToRoomsData = onSnapshot(q, (querySnapshot) => {
  //   const usersRooms = [];
  //   querySnapshot.forEach((doc) => {
  //     usersRooms.push(doc.data());
  //   });
  //   updateUserRooms(usersRooms)
  //   console.log("Current cities in CA: ", usersRooms);
  // });




  // Everything within the provider tags below will have access to our global redux variables.
  return (

    <div>
<<<<<<< HEAD
      {/* <GroupTabs /> */}
      <Test/>
=======
      <GroupTabs />
      {/* <ReduxExample />
      <AutreRedux /> */}

>>>>>>> 8980804c5f498c1204542988e91fc26676b94fcf
    </div>



  );
}
<<<<<<< HEAD
=======


>>>>>>> 8980804c5f498c1204542988e91fc26676b94fcf
