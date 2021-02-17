import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

test('renders learn react link', () => {
  const wrapper = shallow(<App />);

  //https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/debug.html
  //Very helpful for debugging as it returns an HTML-like string of the
  //wrapper for debugging purposes. Useful to print out to the console when
  //tests are not passing when you expect them to.
  console.log(wrapper.debug());

  //When you want to check that wrapper is not undefinied or null. In other
  //words, it is true in a boolean context
  expect(wrapper).toBeTruthy();

  //expect(wrapper).toBeFalsy();
});
