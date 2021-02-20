import { correctGuess, actionTypes } from './';

describe('correctGuess', () => {
  test('returns an action with a type `CORRECT_GUESS`', () => {
    const action = correctGuess();
    //For primitive types (e.g. numbers, booleans, strings, etc.), there is no
    //difference between toBe and toEqual. But they are different when you
    //compare objects. It's the same as with Java, toEqual tests that they are
    //in fcat the same object.
    expect(action).toEqual({ type: actionTypes.CORRECT_GUESS });
  });
});
