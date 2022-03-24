import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface mediaUrlState {
  value: string;
}

const initialState: mediaUrlState = {
  value: '',
}


const mediaUrlSlice = createSlice({
  name: 'mediaUrl',
  initialState,
  reducers: {
    setMediaUrl(state, action: PayloadAction<string>) {
      state.value = action.payload;
    }
  }
})

export const { setMediaUrl } = mediaUrlSlice.actions;


export default mediaUrlSlice.reducer;