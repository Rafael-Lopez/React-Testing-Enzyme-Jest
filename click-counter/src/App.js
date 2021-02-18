import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    // - data-test attribute to test rendering
    //    top level elemnt of component
    // - using data-test we ensure our component is the one rendered, not just any other component rendered!
    // - why new attribute? Why not id or class?
    //    id and class have uses in production app
    //    these might be changed in the future, which will breake your test
    //    data-test is only for testing
    //    conventional, but you can choose any name
    // - if you don't want it in production, there's a way to get rid of these data-test attributes
    <div data-test="component-app" className="App">
      <h1 data-test="counter-display">
        The counter is currently&nbsp;
        <span data-test="count">{count}</span>
      </h1>
      <button
        data-test="increment-button"
        onClick={() => setCount(count + 1)}
      >Increment counter</button>
    </div>
  );
}

export default App;
