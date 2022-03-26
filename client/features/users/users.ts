import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface ArrayState {
  value: any;
}


const initialState: ArrayState = {
  value: {
    userList: [],
    userInfo: [],
  }
}

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserList(state, action: any) {
      state.value.userList = action.payload;
    },
    setUserInfo(state, action: any) {
      state.value.userInfo = action.payload
    }
  }
})


export const { setUserList, setUserInfo } = usersSlice.actions;
export default usersSlice.reducer;