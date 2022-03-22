import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ArrayState {
  value: any;
}

const initialState: ArrayState = {
  value: [],
}

const userRoomsSlice = createSlice({

  name: 'userRooms',
  initialState,
  reducers: {

    setRoomsArray(state, action: PayloadAction<[]>) {
      state.value = action.payload;
    },

  }
})

export const { setRoomsArray } = userRoomsSlice.actions;

export default userRoomsSlice.reducer;