import React from 'react';

import { useAppSelector } from '../hooks';


const AutreRedux = () => {
  const counter = useAppSelector((state) => state.counterExample.value);


  return (

    <div> THIS IS A SEPARATE COMPONENT, Counter: {counter}</div>
  )
}

export default AutreRedux;