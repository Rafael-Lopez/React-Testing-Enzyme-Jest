import moxios from 'moxios';

import { getSecretWord } from './hookActions';

describe('moxios tests', () => {
  beforeEach(() => {
    //makes moxios recieve all of the axios requests, instead of http
    moxios.install();
  });

  afterEach(() => {
    //makes axios go back to its http state
    moxios.uninstall();
  });

//has to be async because we are going to be waiting for the moxios answer
  test('calls the getSecretWord callback on axios response', async () => {
    const secretWord = 'party';

    //handles axios calls that occur during the test
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord
      });
    });

    //create mock for callback arg
    const mockSetSecretWord = jest.fn();

    //getSecretWord is going to be an async function, which is why we had to use async in line 17
    await getSecretWord(mockSetSecretWord);

    //see whether mock was run with the correct argument
    expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord);
  });
});
