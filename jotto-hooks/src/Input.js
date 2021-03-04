import React from 'react';
import PropTypes from 'prop-types';

const Input = ( {secretWord} ) => {
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
          placeholder='enter guess'
        >
        <button
          data-test='submit-button'
          className='btn btn-primary mb-2'>
          Submit
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default Input;
