// React Imports Here
import React from 'react';
import { render } from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
// Redux Imports Here
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';
// Components Imports Here
import './index.css';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { Themes } from './components/Themes/Themes';

const middlewares = [];
middlewares.push(thunk);
if (process.env.NODE_ENV !== 'production') middlewares.push(logger);

const reduxStore = createStore(reducers, applyMiddleware(...middlewares));

// Wrapping our App with Redux Provider
render(
    <Provider store={reduxStore}>
        <ThemeProvider theme={Themes}>
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
