import React from 'react';

import hookActions from './actions/hookActions';
import './App.css';

/**
 * Reducer to update state, called automatically by dispatch
 * @param state {object} - existing state
 * @param action {object} - contains 'type' and 'payload' properties for the state update
 *                   example: { type: "setSecretWord", payload: "party" }
 * @return {object} - new state
 */
//state is passed automatically by dispatch
const reducer = (state, action) => {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload};
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = React.useReducer(
    reducer,
    { secretWord: null }
  );

  const setSecretWord = (secretWord) =>
    dispatch({ type: "setSecretWord", payload: secretWord });

  //Takes two arguments:
  // 1) a function that will run whenever the component updates
  // 2) optional - an array that when any elements in it changes, then this function will re-run
  //    an empty array means that useEffect will only run once (since nothing will change), on App mounts
  React.useEffect(
    () => hookActions.getSecretWord(setSecretWord),
    []
  );

  return <div data-test='component-app'/>
}

export default App;
