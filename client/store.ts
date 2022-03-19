import { configureStore } from "@reduxjs/toolkit";
// Import lines below this line must impor the default export of a given slice file. These slices represent the methods/reducers we use to interact with variables. You can find all slices in the features folder. If you are not sure how to create a new variable/methods contact Richard.
import counterExampleReducer from './features/counterExample/counterExample';


export const store = configureStore({
  // THE REDUCER HERE IS WHERE WE STORE OUR GLOBAL VARIABLES.

  // EACH GLOBAL VARIABLE SHOULD BE STORED AS A KEY VALUE PAIR, THE KEY BEING THE NAME OF THE VARIABLE, THE VALUE BEING THE REDUCER FUNCTIONS THAT ALLOW US TO INTERACT WITH THE VARIABLE.

  reducer: {
    counterExample: counterExampleReducer,
    // example2: example2Reducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;