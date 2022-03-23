import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ArrayState {
  value: any;
}

const initialState: ArrayState = {
  value: {
    example: ['test,', 'test2']
  },
}

const userChatsSlice = createSlice({

  name: 'userChats',
  initialState,
  reducers: {
    setChatsObject(state, action: any) {
      console.log('THIS IS IN REDUX', action.payload);

      return action.payload
    },

    revertChatObject(state, action: any) {
      return initialState;
    }


  }
})

export const { setChatsObject, } = userChatsSlice.actions;

export default userChatsSlice.reducer