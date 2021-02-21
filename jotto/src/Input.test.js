import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from '../test/testUtils';
import Input from './Input';

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
    test('renders component without error', () => {

    });

    test('does not render input box', () => {

    });

    test('does not render submit button', () => {

    });
  });
});

describe('update state', () => {

});
