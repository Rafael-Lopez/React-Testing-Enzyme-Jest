import React from 'react';

import hookActions from './actions/hookActions';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import LanguagePicker from './LanguagePicker';
import Input from './Input';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
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
    case "setLanguage":
      return { ...state, language: action.payload };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = React.useReducer(
    reducer,
    { secretWord: null, language: 'en' }
  );

  const setSecretWord = (secretWord) =>
    dispatch({ type: "setSecretWord", payload: secretWord });
  const setLanguage = (language) =>
    dispatch({ type: "setLanguage", payload: language });

  //Takes two arguments:
  // 1) a function that will run whenever the component updates
  // 2) optional - an array that when any elements in it changes, then this function will re-run
  //    an empty array means that useEffect will only run once (since nothing will change), on App mounts
  React.useEffect(
    () => hookActions.getSecretWord(setSecretWord),
    []
  );

  if(!state.secretWord) {
    return (
      <div className='container' data-test='spinner'>
        <div className='spinner-boarder' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
        <p>Loading secret word!</p>
      </div>
    );
  }

  return (
    <div data-test='component-app'>
      <h1>Jotto</h1>
      //Any time state.language changes, all the children component will be re-rendered
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
          //remember, we don't have to worry about providing a value to SuccessProvider, the value is embedded
          <successContext.SuccessProvider>
            <Congrats />
            <Input secretWord={state.secretWord} />
          </successContext.SuccessProvider>
          {/* <GuessedWords /> */}
      </languageContext.Provider>
    </div>
  );
}

export default App;
