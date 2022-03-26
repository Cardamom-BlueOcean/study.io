import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface userNameState {
  value: string;
}

const initialState: userNameState = {
  value: '',
}


const userNameSlice = createSlice({
  name: 'userName',
  initialState,
  reducers: {
    setUserName(state, action: PayloadAction<string>) {
      state.value = action.payload;
    }
  }
})

export const { setUserName } = userNameSlice.actions;


export default userNameSlice.reducer;