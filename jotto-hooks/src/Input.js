import React from 'react';
import PropTypes from 'prop-types';

import languageContext from './contexts/languageContext';
import stringsModule from './helpers/strings';

const Input = ( {secretWord} ) => {
  const language = React.useContext(languageContext);
  //Use hooks this way in order to be able to mock them.
  //Do NOT use destructuring in import. E.g. import {useState} from 'react'
  const [ currentGuess, setCurrentGuess ] = React.useState('');

  return (
    <div data-test='input-component'>
      <form className='form-inline'>
        <input
          data-test='input-box'
          type='text'
          className='mb-2 mx-sm-3'
          placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')}
          value={currentGuess}
          onChange={event => setCurrentGuess(event.target.value)}
        />
        <button
          data-test='submit-button'
          className='btn btn-primary mb-2'
          onClick={ evt => {
            //If we don't call preventDefault(), the form will be submitted and the page refreshed
            evt.preventDefault();
            setCurrentGuess('');
          } }>
          {stringsModule.getStringByLanguage(language, 'submit')}
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default Input;
