import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Covers from './components/Covers';
import './style.css';

import { rootReducer } from './reducers';
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <Covers />
    </Provider>
    ,
    document.getElementById('root')
);
