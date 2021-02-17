import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

test('renders without error', () => {
  const wrapper = shallow(<App />);

  const appComponent = wrapper.find("[data-test='component-app']");
  expect(appComponent.length).toBe(1);
});

test('renders button', () => {
  const wrapper = shallow(<App />);
  const button = wrapper.find("[data-test='increment-button']");
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = shallow(<App />);
  const display = wrapper.find("[data-test='counter-display']");
  expect(display.length).toBe(1);
});

test('counter starts at 0', () => {

});

test('clicking on button increments counter display', () => {

});
