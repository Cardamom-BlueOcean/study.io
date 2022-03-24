import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// Import lines below this line must impor the default export of a given slice file. These slices represent the methods/reducers we use to interact with variables. You can find all slices in the features folder. If you are not sure how to create a new variable/methods contact Richard.

import counterExampleReducer from './features/counterExample/counterExample';
import arrayExampleReducer from './features/arrayExample/arrayExample';
// import objectExampleReducer from './features/objectExample/objectExample';
import globalFunctionsReducer from './features/globalFunctions/globalFunctions';
import userRoomsReducer from './features/userRooms/userRooms';
import userChatsReducer from './features/userChats/userChats';
import userIdReducer from './features/userId/userId';
import userNameReducer from './features/userName/userName';
import mediaUrlReducer from './features/mediaUrl/mediaUrl';
import usersReducer from './features/users/users';

export const store = configureStore({
  // THE REDUCER HERE IS WHERE WE STORE OUR GLOBAL VARIABLES.

  // EACH GLOBAL VARIABLE SHOULD BE STORED AS A KEY VALUE PAIR, THE KEY BEING THE NAME OF THE VARIABLE, THE VALUE BEING THE REDUCER FUNCTIONS THAT ALLOW US TO INTERACT WITH THE VARIABLE.

  reducer: {
    counterExample: counterExampleReducer,
    arrayExample: arrayExampleReducer,
    // objectExample: objectExampleReducer,
    globalFunctions: globalFunctionsReducer,
    userRooms: userRoomsReducer,
    userChats: userChatsReducer,
    userId: userIdReducer,
    userName: userNameReducer,
    mediaUrl: mediaUrlReducer,
    users: usersReducer,
    // example2: example2Reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false, })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;