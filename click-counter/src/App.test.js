import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @return {ShallowWrapper}
*/
const setup = () => shallow(<App />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test('renders button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const display = findByTestAttr(wrapper, "counter-display");
  expect(display.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("0");
});

test('clicking on button increments counter display', () => {
  const wrapper = setup();

  //find the button
  const button = findByTestAttr(wrapper, "increment-button");

  //click the button
  button.simulate("click");

  //find the display, and test that the number has been incremented
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("1");
});

test('clicking on button decrements counter display', () => {
  const wrapper = setup();
  const incrementButton = findByTestAttr(wrapper, "increment-button");
  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  incrementButton.simulate("click");
  decrementButton.simulate("click");
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("0");
});

test('count cannot go below zero', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate("click");
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("0");
});

test('error message is displayed when trying to go below zero', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate("click");
  const count = findByTestAttr(wrapper, "error");
  expect(count.length).toBe(1);
});

test('if error is showing, remove it when increment button is clicked', () => {
  const wrapper = setup();
  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  const incrementButton = findByTestAttr(wrapper, "increment-button");

  decrementButton.simulate("click");
  incrementButton.simulate("click");

  const count = findByTestAttr(wrapper, "error");
  expect(count.length).toBe(0);
});
