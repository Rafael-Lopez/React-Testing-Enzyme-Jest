import React from 'react';
import { mount } from 'enzyme';

import { findByTestAttr } from '../test/testUtils';
import hookActions from './actions/hookActions';
import App from './App';

//We don't need this mock to do anything or return anything, we just need it to spy
//on it to see if it's called in the appropriate place, and not run when we don't want it to
const mockGetSecretWord = jest.fn();

/**
 * Setup function for app component
 * @returns {ReactWrapper}
 */
const setup = () => {
  //to make sure the calls from past tests are not carried over to the next test
  mockGetSecretWord.mockClear();
  //we follow the same pattern to replace a real function with a mock
  hookActions.getSecretWord = mockGetSecretWord;

  //To test useEffect we have to use mount() for now. Enzyme currently has a bug where useEffect
  //is not called when using shallow(), only mount().
  //https://github.com/airbnb/enzyme/issues/2086
  return mount(<App />);
}

test('App renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app');

  expect(component.length).toBe(1);
});

describe('`getSecretWord` calls', () => {
  test('`getSecretWord` gets called on App mount', () => {
    setup();

    //check to see if secret word was updated
    expect(mockGetSecretWord).toHaveBeenCalled();
  });

  test('secretWord does not update on App update', () => {
    const wrapper = setup();
    //mockGetSecretWord is called after App is mounted, so we need to clear it
    //in order to test that it doesn't get called again after App is refreshed
    mockGetSecretWord.mockClear();

    //At the moment, update() doesn't rerender a functional component (so no useEffect call) - but setProps does.
    //https://github.com/enzymejs/enzyme/issues/2254
    wrapper.setProps();

    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});
