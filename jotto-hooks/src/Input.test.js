import React from 'react';
import { mount } from 'enzyme';

import languageContext from './contexts/languageContext';
import { findByTestAttr, checkProps } from '../test/testUtils';
import Input from './Input';

/**
* Create ReactWrapper for Input component for testing
* @param {object} testValues - Context and props values for this specific test.
* @returns {ReactWrapper} - Wrapper for Input component and providers
*/
const setup = ({ language, secretWord }) => {
  language = language || "en";
  secretWord = secretWord || "party";

  return mount(
    <languageContext.Provider value={language} >
          <Input secretWord={secretWord} />
    </languageContext.Provider>
  );
}

test('renders Input component', () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, 'input-component');

  expect(component.length).toBe(1);
});

test('does not throw warning with expected props', () => {
  const wrapper = setup({});

  checkProps(Input, { secretWord: 'party' });
});

describe('state controlled input field', () => {
  //create mock function
  let mockSetCurrentGuess = jest.fn();
  let wrapper;

  beforeEach( () => {
    //clear mock function every time so that it doesn't take the results from the last test and carries them into the next test
    mockSetCurrentGuess.mockClear();
    //replace React.useState with our mock function
    React.useState = jest.fn(() => ['', mockSetCurrentGuess]);
    wrapper = setup({});
  });

  test('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');

    //The following tow lines are to simultae input-box getting a value of 'train'
    const mockEvent = { target: { value: 'train' } };
    //Simulate events on the root node in the wrapper. It must be a single-node wrapper.
    //Arguments
    //event (String): The event name to be simulated
    //mock (Object [optional]): A mock event object that will be merged with the event object passed to the handlers.
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });

  test('field is cleared upon submit button click', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button');

    const mockEvent = { preventDefault: () => {} };
    submitButton.simulate('click', mockEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  });
});

describe('languagePicker', () => {
  test('correctly renders submit string in english', () => {
    const wrapper = setup({ language: "en" });
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    expect(submitButton.text()).toBe('Submit');
  });
  test('correctly renders congrats string in emoji', () => {
    const wrapper = setup({ language: "emoji" });
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    expect(submitButton.text()).toBe('🚀');
  });
});
