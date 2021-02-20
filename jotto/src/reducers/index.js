import { combineReducers } from 'redux';
import success from './successReducer';

//Using Object Property Value Shorthand: in JavaScript with ES6/ES2015, if
//you want to define an object who's keys have the same name as the variables
//passed-in as properties, you can use the shorthand and simply pass the key name.
//This is the equivalent of what's being defined below: {success: success}
export default combineReducers({
  success,
});
