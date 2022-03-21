import { useState } from "react";
import GroupTabs from "./GroupTabs";
import ReduxExample from "./reduxExample";
import AutreRedux from "./AutreRedux";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  doc,
  getDoc,
  orderBy
} from "firebase/firestore";
import "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
      const getUsersRoomDataOnceAuthorized = async () => {//this is to get the room data
        if (user) {
          const UID = user.uid;
          const q =  query(
            collection(db, "Rooms"),
            where("RoomParticipants", "array-contains", UID)
          );
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            //this function is a listener for the Users Rooms. It will Update when there are new rooms that includes the user
            const Rooms: any[] = []; //this is where the rooms are stored
            querySnapshot.forEach((doc) => {
              console.log('doc', doc)
              Rooms.push(doc.data());
            });
            console.log("ROOMS: ", Rooms);
            // updateUserRooms(Rooms);
          });
        }
      };
      getUsersRoomDataOnceAuthorized();









      const subsribeToUpdatesForARoom = async (roomTolistenTO) =>{//The function can be called to subscribe to a room in
        if (user) {
          const q =  query(
            collection(db, "Rooms", roomTolistenTO, "Chats"), orderBy("TimeStamp")
          );//
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const chats: any[] = [];
            querySnapshot.forEach((doc) => {
              chats.push(doc.data());
            });
            console.log("Chats: ", chats);
            // updateUserRooms(chats);
          });
        }
      }
      subsribeToUpdatesForARoom("NAJXCCti8U4JWU9k7nnZ")//example of what a call to subsribe to a room would look like
    });
  };
  dbQuerysAndSubscriptions();












  return (
    <div>
      <GroupTabs />
      <ReduxExample />
      <AutreRedux />
    </div>
  );
}
