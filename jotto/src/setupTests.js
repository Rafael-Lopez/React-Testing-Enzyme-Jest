import Enzyme from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
  //If set to true, componentDidMount is not called on the component, and
  //componentDidUpdate is not called after setProps and setContext. Default to false.
  disableLifecycleMethods: true
});
