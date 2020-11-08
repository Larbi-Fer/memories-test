import React from 'react';
import RectDom from 'react-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './app'

const store = createStore(reducers, compose(applyMiddleware(thunk)))

RectDom.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
)