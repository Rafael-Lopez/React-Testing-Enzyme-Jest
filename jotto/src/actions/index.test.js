import moxios from 'moxios';

import { storeFactory } from '../../test/testUtils';
import { getSecretWord } from './';

describe('getSecretWord action creator', () => {
  beforeEach(() => {
    //If the app uses an Axios instance, you can pass it as an argument to install
    moxios.install();
  });

  afterEach(() => {
    //To clean and return axios to its original state
    moxios.uninstall();
  });

  test('adds response word to state', () => {
    const secretWord = 'party';
    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord
      });
    });

    //This store.dispatch will actually return a promise, which means we can put the
    //test in the .then() callback, which is when the promise resolves

    //We return this promise so that it will surely wait for this to resolve before completing the test
    //and any errors will be considered when the test determines whether it passes or fails
    return store.dispatch(getSecretWord()).
      then(() => {
        const newState = store.getState();
        expect(newState.secretWord).toBe(secretWord);
      });
  });
});
