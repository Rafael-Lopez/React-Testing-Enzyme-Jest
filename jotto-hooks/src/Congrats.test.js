import React from 'react';
import { mount } from 'enzyme';

import { findByTestAttr } from '../test/testUtils';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import Congrats from './Congrats';

/**
* Factory function to create a ShallowWrapper for the Congrats component.
* @function setup
* @param {object} testValues - contextValues specific to this setup.
* @returns {ShallowWrapper}
*/
const setup = ({ success, language }) => {
  //Setting some default values in case they are not provided
  // if language is truthy, it won't bother with the second part (e.g. 'en'), but
  //if  it's falsy, then it'll use 'en' as the default value for language
  language = language || 'en';
  success = success || false;

  //if you check SuccessProvider, it receives 'props'
  return mount(
    <languageContext.Provider value={language}>
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <Congrats />
      </successContext.SuccessProvider>
    </languageContext.Provider>
  );
}

describe('language picker', () => {
  test('correctly renders congrats string in English by default', () => {
    const wrapper = setup({ success: true });
    expect(wrapper.text()).toBe('Congratulations! You guessed the word!');
  });

  test('correctly renders congrats string in emoji', () => {
    const wrapper = setup({ success: true, language: "emoji" });
    expect(wrapper.text()).toBe('🎯🎉');
  });
});

test('renders without error', () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.length).toBe(1);
});
test('renders no text when `success` is false', () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.text()).toBe('');
});
test('renders non-empty congrats message when `success` is true', () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, 'congrats-message');
  expect(message.text().length).not.toBe(0);
});
