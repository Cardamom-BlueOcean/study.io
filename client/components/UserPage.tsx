import * as React from 'react';
import GroupTabs from './GroupTabs';
import ReduxExample from './redux-examples/ReduxExample';
import AutreRedux from './redux-examples/AutreRedux';
//Redux Imports Below:
import { Provider } from 'react-redux';
import { store } from '../store';




export default function UserPage() {


  // Everything within the provider tags below will have access to our global redux variables.
  // test
  return (

    <div>
      <GroupTabs />
      <ReduxExample />
      <AutreRedux />

    </div>



  );
}


