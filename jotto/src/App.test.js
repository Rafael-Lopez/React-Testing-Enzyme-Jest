import React from 'react';
import Enzyme, {shallow} from 'enzyme';

import App from './App';
import { storeFactory } from '../test/testUtils';

const setup = (initialState) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<App store={store} />).dive().dive();
  return wrapper;
}

describe('redux state', () => {
  test('has access to `success state`', () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;

    expect(successProp).toBe(success);
  });

  test('has access to `secretWord` state', () => {
    const secretWord = 'party';
    const wrapper = setup({ secretWord });
    const secretWordProp = wrapper.instance().props.secretWord;

    expect(secretWordProp).toBe(secretWord);
  });

  test('has access to `guessedWords` state', () => {
    const guessedWords = [{ guessedWord: 'train', letterMatchCount: 3}];
    const wrapper = setup({ guessedWords });
    const guessedWordsProp = wrapper.instance().props.guessedWords;

    expect(guessedWordsProp).toEqual(guessedWords);
  });

  test('`getSecretWord` action creator is a function in the props', () => {
    const wrapper = setup();
    const getSecretWordProp = wrapper.instance().props.getSecretWord;

    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
});
