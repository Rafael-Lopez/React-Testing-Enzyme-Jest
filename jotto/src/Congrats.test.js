import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

import Congrats from './Congrats';
import {findByTestAttr} from '../test/testUtils';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props={}) => {
  return shallow(<Congrats {...props} />);
}

test('renders withot error', () => {
  const wrapper = shallow(<Congrats />);

});

test('renders no text when `success` prop is false', () => {

});

test('renders non-empty congrats message when `success` prop is true', () => {

});
