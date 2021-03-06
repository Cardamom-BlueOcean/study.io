
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";
import "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";


interface globalFunctionsState {
  value: any;
}

const initialState: globalFunctionsState = {
  value: {
    // If you want to write additonal functions that will be available globally just follow the example below

    // then at the point of use:
    // const example = useAppSelector((state) => state.globalFunctions.example);

    // now when you invoke example() in your component it will act as you expect :)

    example(parameters) {
      // body of function here
    },

    async createRoom(roomName) {
      const db = getFirestore();
      const auth: any = await getAuth();
      onAuthStateChanged(auth, (user: any) => {
        if (user) {
          const creatRoomOnceAuthorized = async () => {
            await setDoc(doc(db, "Rooms", roomName), {
              RoomName: roomName,
              RoomParticipants: [user.uid],
              DM: false,
            });

          }
          const addRoomToUserArray = async () => {
            await setDoc(doc(db, "Users", user.uid), {
              name: user.displayName,
              email: user.email,
              thumbnailPhotoURL: user.photoURL,
              uid: user.uid,
              rooms: arrayUnion(roomName)
            }, { merge: true });

          }

          creatRoomOnceAuthorized()
          addRoomToUserArray()
        }



      })

    },

    async createDM(combinedNames) {
      const db = getFirestore();
      const auth: any = await getAuth();
      onAuthStateChanged(auth, (user: any) => {
        if (user) {
          const creatRoomOnceAuthorized = async () => {
            await setDoc(doc(db, "Rooms", combinedNames), {
              RoomName: combinedNames,
              RoomParticipants: [user.uid],
              DM: true,
            });

          }
          const addRoomToUserArray = async () => {
            await setDoc(doc(db, "Users", user.uid), {
              name: user.displayName,
              email: user.email,
              thumbnailPhotoURL: user.photoURL,
              uid: user.uid,
              rooms: arrayUnion(combinedNames)
            }, { merge: true });

          }

          creatRoomOnceAuthorized()
          addRoomToUserArray()

        }



      })


    },

    async addNewUserToRoom(userToAdd, currentRoom, db) {
      await updateDoc(doc(db, "Users", userToAdd.uid), {
        rooms: arrayUnion(currentRoom)
      });
      await updateDoc(doc(db, "Rooms", currentRoom), {
        RoomParticipants: arrayUnion(userToAdd.uid)
      })
    },
  }
}


const globalFunctionsSlice = createSlice({
  name: 'global functions',
  initialState,
  reducers: {

    useCreateRoom(state, action: PayloadAction<string>) {
      state.value.createRoom(action.payload)

    }
  }
})


export const { useCreateRoom } = globalFunctionsSlice.actions;
export default globalFunctionsSlice.reducer