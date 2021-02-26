import checkPropTypes from 'check-prop-types';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../src/reducers';
import { middlewares } from '../src/configureStore'

/**
 * Create a testing store with imported reducers, middleware, and initial state
 * @param {object} initialState - Initial state for store
 * @function storeFactory
 * @returns {Store} - Redux store
 */
export const storeFactory = initialState => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, initialState);
};

export const checkProps = (component, conformingProps) => {
  // prop-types only throws/displays a warning if the prop types are incorrect
  // check-prop-types will actually return any errors instead of logging them to console.error
  const propError = checkPropTypes(component.propTypes, conformingProps, 'prop', component.name);
  // since the prop types are correct, we expect no error. In other words, propError should be undefined
  expect(propError).toBeUndefined();
}

/**
 * Return node(s) with the given data-test attribute
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper
 * @param {Sring} val - Value of data-test attribute for search
 * @returns {ShallowWrapper}
*/
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};
