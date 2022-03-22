import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ArrayState {
  value: any;
}

const initialState: ArrayState = {
  value: [],
}

const userChatsSlice = createSlice({

  name: 'userChats',
  initialState,
  reducers: {
    setChatsArray(state, action: PayloadAction<[]>) {
      state.value = action.payload
    },

    addToChatsArray(state, action: PayloadAction<[]>) {
      state.value = [...state.value, ...action.payload];
    }
  }
})

export const { setChatsArray, addToChatsArray } = userChatsSlice.actions;

export default userChatsSlice.reducer