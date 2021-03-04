import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from '../test/testUtils';
import Input from './Input';

/**
 * Setup function for Input component
 * @returns {ShallowWrapper}
 */
const setup = (secretWord = 'party') => {
  return shallow(<Input secretWord={secretWord}/>);
};

test('renders Input component', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'input-component');

  expect(component.length).toBe(1);
});

test('does not thrpw warning with expected props', () => {
  const wrapper = setup();

  checkProps(Input, { secretWord: 'party' });
});
