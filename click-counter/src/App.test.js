import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

test('renders without error', () => {
  const wrapper = shallow(<App />);
});

test('renders button', () => {

});

test('renders counter display', () => {

});

test('counter starts at 0', () => {

});

test('clicking on button increments counter display', () => {

});
