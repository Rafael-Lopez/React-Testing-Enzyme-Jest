import { createStore, applyMiddleware } from 'redux';
//If your import path is a folder and don't include a file name, it will automatically use the index.js file.
//This is a commonJS convention that is followed by webpack in create-react-app projects.
//In this case, we import the 'reducers' folder, which basically results in the index.js file in that folder
import rootReducer from './reducers';
import ReduxThunk from 'redux-thunk';

export const middlewares = [ReduxThunk];
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default createStoreWithMiddleware(rootReducer);
