import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ArrayState {
  value: any;
}

const initialState: ArrayState = {
  value: [],
}

const userDMsSlice = createSlice({

  name: 'userDMs',
  initialState,
  reducers: {

    setDMsArray(state, action: PayloadAction<[]>) {
      state.value = action.payload;
    },

  }
})

export const { setDMsArray } = userDMsSlice.actions;

export default userDMsSlice.reducer;