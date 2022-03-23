import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface userIdState {
  value: string;
}

const initialState: userIdState = {
  value: '',
}


const userIdSlice = createSlice({
  name: 'userId',
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<string>) {
      state.value = action.payload;
    }
  }
})

export const { setUserId } = userIdSlice.actions;


export default userIdSlice.reducer;