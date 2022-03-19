import * as React from 'react';
// import GroupTabs from './GroupTabs';
import ReduxExample from './reduxExample';

//Redux Imports Below:
import { Provider } from 'react-redux';
import { store } from '../store';




export default function UserPage() {


  // Everything within the provider tags below will have access to our global redux variables.
  return (
    <Provider store={store}>


      <ReduxExample />

    </Provider>


  );
}


//    {/* <GroupTabs /> */}