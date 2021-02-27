import { storeFactory } from '../test/testUtils';
import { guessWord } from './actions';

describe('guessWord action dispatcher', () => {
  const secretWord = 'party';
  const unsuccessfulGuess = 'train';

  describe('no guessed words', () => {
    let store;
    const initialState = { secretWord };
    beforeEach(() => {
      store = storeFactory(initialState);
    });

    test('updates state correctly for unsuccessful guess', () => {
      const expectedState = {
        ...initialState,
        success: false,
        guessedWords: [{
          guessedWord: unsuccessfulGuess,
          letterMatchCount: 3
        }]
      };

      // dispatch and getState are methods available in the Store object
      // https://redux.js.org/api/store
      store.dispatch( guessWord(unsuccessfulGuess) );
      const newState = store.getState();

      expect(newState).toEqual(expectedState);
    });
    test('updates state correctly for successful guess', () => {
      const expectedState = {
        ...initialState,
        success: true,
        guessedWords: [{
          guessedWord: secretWord,
          letterMatchCount: 5
        }],
      };

      store.dispatch( guessWord(secretWord) );
      const newState = store.getState();

      expect(newState).toEqual(expectedState);
    });
  });

  describe('some guessed words', () => {
    const guessedWords = [ {guessedWord: 'agile', letterMatchCount: 1} ];
    const initialState = { guessedWords, secretWord };
    let store;
    beforeEach(() => {
      store = storeFactory(initialState);
    });

    test('updates state correctly for unsuccessful guess', () => {
      const expectedState = {
        ...initialState,
        success: false,
        guessedWords: [ ...guessedWords, { guessedWord: unsuccessfulGuess, letterMatchCount: 1} ]
      };

      store.dispatch( guessWord(unsuccessfulGuess) );
      const newState = store.getState();

      expect(newState).toEqual(expectedState);
    });

    test('updates state correctly for successful guess', () => {
      const expectedState = {
        ...initialState,
        success: true,
        guessedWords: [ ...guessedWords, { guessedWord: secretWord, letterMatchCount: 5} ]
      }

      store.dispatch( guessWord(secretWord) );
      const newState = store.getState();

      expect(newState).toEqual(expectedState);
    });
  });

});
