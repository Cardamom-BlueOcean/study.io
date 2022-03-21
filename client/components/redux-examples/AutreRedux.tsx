import React from 'react';

import { useAppSelector } from '../../hooks';


const AutreRedux = () => {
  const counter = useAppSelector((state) => state.counterExample.value);
  const arrayTest = useAppSelector((state) => state.arrayExample.value);

  return (

    <div> THIS IS A SEPARATE COMPONENT, Counter: {counter}

      {arrayTest.map((item) => (
        <p>{item}</p>
      ))}

    </div>
  )
}

export default AutreRedux;