import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from '../test/testUtils';
import Input from './Input';

/**
 * Setup function for Input component
 * @returns {ShallowWrapper}
 */
const setup = (secretWord = 'party') => {
  return shallow(<Input secretWord={secretWord}/>);
};

test('renders Input component', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'input-component');

  expect(component.length).toBe(1);
});

test('does not thrpw warning with expected props', () => {
  const wrapper = setup();

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
    wrapper = setup();
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
