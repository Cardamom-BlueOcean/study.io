import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ArrayState {
  value: Array<string | [] | number | {}>;
}

const initialState: ArrayState = {
  value: ['Alex', 'BJ', 'Amy'],
}


const arrayExampleSlice = createSlice({

  name: 'arrayExample',
  initialState,
  reducers: {


    setArray(state, action: PayloadAction<[]>) {
      state.value = action.payload;
    },

    revertArray(state) {
      state.value = initialState.value
    },

    addArrayToArray(state, action: PayloadAction<[]>) {
      state.value = [...state.value, ...action.payload];
    }
  }

})


export const { addArrayToArray, setArray, revertArray } = arrayExampleSlice.actions;


export default arrayExampleSlice.reducer;