import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ArrayState {
  value: any;
}

const initialState: ArrayState = {
  value: {},
}

const userChatsSlice = createSlice({

  name: 'userChats',
  initialState,
  reducers: {
    setChatsObject(state, action: PayloadAction<{}>) {
      console.log('THIS IS IN REDUX', action.payload);

      Object.assign({}, ...action.payload)
    },


  }
})

export const { setChatsObject, } = userChatsSlice.actions;

export default userChatsSlice.reducer