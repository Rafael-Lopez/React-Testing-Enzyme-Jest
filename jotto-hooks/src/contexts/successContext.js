import React from 'react';

//Context with state embedded
//https://kentcdodds.com/blog/application-state-management-with-react
const successContext = React.createContext();


/**
* @function useSuccess
* @returns {array} successContext value, which is a state of [value, setter].
*
*/
function useSuccess() {
  const context = React.useContext(successContext);

  if(!context) {
    throw new Error('useSuccess must be used within a SuccessProvider');
  }

  return context;
}

/**
* @function SuccessProvider
* @param {object} props - props to pass through from declared component
* @returns {JSX.Element} Provider component
*/
function SuccessProvider(props) {
    const [success, setSuccess] = React.useState(false);

    //ensures that we don't re-calculate 'value' any more frequently than we need to.
    //the use of memoization is the idea of "if a function has the same inputs, don't worry
    //about re-calculating the function, just return the outputs that you have saved, from
    //a previous iteration of the function"
    const value = React.useMemo(() => [success, setSuccess], [success]);

    //{...props} is after value={value}, this means that we can pass a 'value' prop, to override
    //the internal 'value'. See Congrats.test.js
    return <successContext.Provider value={value} {...props} />
}

export default { SuccessProvider, useSuccess }
