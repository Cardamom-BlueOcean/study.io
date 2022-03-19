import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Above are the two default imports you will need for all redux variables. The Create slice allows us to create methods that will interact with redux variables. This is the only way you can interact with a redux variable.


// interface is a TypeScript specific thing, not redux.
// All we are doing here is specifying the strict type that this variable will maintain.
interface CounterState {
  value: number;
}

// initial state does what it says, upon page reload, this is what the redux variable will start as. The : CounterState simpyl refers to the interface we defined above.
const initialState: CounterState = {
  value: 0,
}

const counterExampleSlice = createSlice({
  // description of what our variable will be.
  name: 'counter',
  // the initial state of our variable as defined on line 12. This line below uses implicit object notation. It's the same as writing initialState: initialState
  initialState,
  // reducers are the money. They are the methods that allow us to interact with our state variable. Examples follow.
  reducers: {
    // once again using implicit object notation, we're creating a property called incremented with a value of a function called incremented. It takes one parameter 'state' and modifies state's value property
    incremented(state) {
      state.value++
    },
    // state will be defined at the point of use, where useAppSelector is invoked, you can see an example of this in my example component.
    decremented(state) {
      state.value--;
    },


    //okay theres some important stuff happening in amountAdded and it looks confusing but it'll make sense.

    //The teal PayloadAction<number> is typescript again. We are defining action's type as a redux class called payloadaction, and we are setting a generic type of number. This means that at the point of use, we will be modifying our given variable's state (which has a strict type of number) with another number.

    // an action and its payload basically means that we are using a variable value to interact with our redux variable.
    // You can again see an example of this in the example component.
    // In this case, a simple was to think of this is just our Counter variable having another variable (ex. let toBeAdded = 15) added to it. So whatever the given state of our counter variable, when we invoke amountAdded(toBeAdded) it will increment by 15.
    amountAdded(state, action: PayloadAction<number>) {
      state.value += action.payload;
    }

    // can we just redefine state.value = action.payload??

  }


})

// All given reducers (you can think of them as methods) must be exported in a desctructured object. They will then be imported at the point of use in a desctructutred format. See example component for usage.
export const { incremented, decremented, amountAdded } = counterExampleSlice.actions;



// This export line is critical. We are setting the default export of this file to be the reducer that is generated from the createSlice function. This default export will be imported as the value for the key value pair in our store file.
export default counterExampleSlice.reducer;