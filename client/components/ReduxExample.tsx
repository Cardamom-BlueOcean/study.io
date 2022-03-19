// Consider this file as a template you can refer to in order to make use of our global variables defined in the store.ts file.

import * as React from 'react';
import { useState } from 'react';
// The two custom hooks below are required to interact with redux variables.
// useAppSelector gives you access to the redux variable's state
// useAppDispatch gives you acceess to the redux variables reducers, AKA methods that we defined in the slice file.
import { useAppSelector, useAppDispatch } from '../hooks';



// Below are the reducers that we use to interact with our counter variable.
import { incremented, decremented, amountAdded } from '../features/counterExample/counterExample';

//if you were to use an additional redux variable in this file, you would simply need to do an additional import to get those methods.


import styled from 'styled-components';

const ReduxStyled = styled.div`
bottom: 0%;
`



// create a React component as normal

const ReduxExample = () => {


  // great we have now defined a variable called counter, which we will use as our local alias for our counterExample variable in our redux store.
  const counter = useAppSelector((state) => state.counterExample.value);

  // every file in which you use reducers should have dispatch defined as so, this is how you access the reducers, you can see an example in the handleClick below.
  const dispatch = useAppDispatch();

  const [test, setTest] = useState('');

  const handleIncrement = () => {
    // here we invoke our counterExample's incremented function,to globally change its state.
    dispatch(incremented());
  }

  const handleAmount = () => {
    dispatch(amountAdded(5));
  }

  const handleDecrement = () => {
    dispatch(decremented());
  }

  return (
    <ReduxStyled>


      <div className='reduxExample'>
        Counter: {counter}
        <br></br>

        <button type='button' onClick={handleIncrement}>Increment</button>
        <button type='button' onClick={handleAmount}>Increment by 5!</button>
        <button type='button' onClick={handleDecrement}>Decrement</button>




      </div>

    </ReduxStyled>
  )

}


export default ReduxExample;
