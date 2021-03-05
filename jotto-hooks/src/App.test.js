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
 * @param {String} secretWord - desired secretWord state value for test
 * @returns {ReactWrapper}
 */
const setup = (secretWord="party") => {
  //to make sure the calls from past tests are not carried over to the next test
  mockGetSecretWord.mockClear();
  //we follow the same pattern to replace a real function with a mock
  hookActions.getSecretWord = mockGetSecretWord;

  //this is another way to do what we did in Input.test.js, when mocking useState
  //mockReturnValue takes two arguments: desired state, dispatch function
  const mockUseReducer = jest.fn()
    .mockReturnValue([
      { secretWord },
      jest.fn()
    ]);

  React.useReducer = mockUseReducer;


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

describe('secretWord is not null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup("party");
  });

  test('renders app when secretWord is not null', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app');

    expect(appComponent.exists()).toBe(true);
  });

  test('does not render spinner when secretWord is not null', () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner');

    expect(spinnerComponent.exists()).toBe(false);
  });
});

describe('secretWord is null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null);
  });

  test('does not render app when secretWord is null', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app');

    expect(appComponent.exists()).toBe(false);
  });

  test('renders spinner when secretWord is null', () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner');

    expect(spinnerComponent.exists()).toBe(true);
  });
});
