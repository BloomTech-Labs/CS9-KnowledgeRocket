// React Imports Here
import React from 'react';
import { render } from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
// Redux Imports Here
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';
import reducers from './reducers';
// Components Imports Here
import './index.css';
import App from './App';

// Apply Middleware to the Redux Store, to handle promises.
// const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

// // Create Store with Reducers and Redux Extention Support for Chrome Dev Tools.
// const reduxStore = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const reduxStore = createStore(
    reducers,
    applyMiddleware(thunk)
);

// Wrapping our App with Redux Provider
render(
    <Provider store={reduxStore}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
