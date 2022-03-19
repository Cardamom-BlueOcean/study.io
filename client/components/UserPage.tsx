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



  return (
    <div>
      {/* <GroupTabs /> */}
      <Test/>
    </div>
  );
}
