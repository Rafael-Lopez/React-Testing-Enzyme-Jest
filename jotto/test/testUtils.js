import checkPropTypes from 'check-prop-types';

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
