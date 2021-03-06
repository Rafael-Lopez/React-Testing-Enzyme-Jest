import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from '../test/testUtils';
import Input, { UnconnectedInput } from './Input';

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @param {object} initialState - Initial state for this setup
 * @returns {ShallowWrapper}
 */
const setup = (initialState={}) => {
  const store = storeFactory(initialState);
  //Because Input is wrapped with connect() for Redux, if we just do something like
  //  shallow(<Input store={store} />);
  //then we get the following:
  //  <ContextProvider value={{...}}>
  //    <Input store={{...}} dispatch={[Function: dispatch]} />
  //  </ContextProvider>
  //which is correct, because the Input component is wrapped by the ContextProvider
  //higher order component (HOC) by using connect(), in order to allow Input to
  //access the Redux store.
  //We use the dive() enzyme function to retrieve the non-DOM child,in other words,
  //the React child component of the ShallowWrapper. Since we want to test what the
  //Input component renders, we need to do dive() twice.
  const wrapper = shallow(<Input store={store} />).dive().dive();
  return wrapper;
};

describe('render', () => {
  describe('word has not been guessed', () => {
    let wrapper;

    beforeEach(() => {
      const initialState = { success: false };
      wrapper = setup(initialState);
    });

    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });

    test('renders input box', () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(1);
    });

    test('renders submit button', () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.length).toBe(1);
    });
  });

  describe('word has been guessed', () => {
    let wrapper;

    beforeEach(() => {
        const initialState = { success: true };
        wrapper = setup(initialState);
    });

    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });

    test('does not render input box', () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(0);
    });

    test('does not render submit button', () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.length).toBe(0);
    });
  });
});

describe('redux props', () => {
  test('has success piece of state as prop', () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;

    expect(successProp).toBe(success);
  });

  test('`guessWord` action creator is a function prop', () => {
    const wrapper = setup();
    const guessWordProp = wrapper.instance().props.guessWord;

    expect(guessWordProp).toBeInstanceOf(Function);
  })
});

describe('`guessWord` action creator call', () => {
  let guessWordMock;
  let wrapper;
  const guessedWord = 'train';
  beforeEach(() => {
    //create a mock function for 'getSecretWord'
    guessWordMock = jest.fn();

    //set up Input, with guessWordMock as a prop
    wrapper = shallow(<UnconnectedInput guessWord={guessWordMock} />);

    //add value to input box
    //enzyme's setState invokes setState() on the root component instance
    wrapper.setState({ currentGuess: guessedWord });

    //simulate click
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    //we need to hand in an event explicitly, in this case, preventDefault
    //if we don't do this, we will get an error in the test
    submitButton.simulate('click', { preventDefault() {} });
  });

  test('calls `guessWord` when button is clicked', () => {
    //check to see if mock ran
    const guessWordCallCount = guessWordMock.mock.calls.length;
    expect(guessWordCallCount).toBe(1);
  });

  test('calls `guessWord` with input value as argument', () => {
    //calls is an array of arrays, where every array represents a function call, and
    //the content is the arguments passed to the function
    const guessWordArg = guessWordMock.mock.calls[0][0];
    expect(guessWordArg).toBe(guessedWord);
  });

  test('input box clears on submit', () => {
    expect(wrapper.state('currentGuess')).toBe('');
  });
});
