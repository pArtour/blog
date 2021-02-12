import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {reducer} from "./store/rootReducer";
import './index.css';
import App from './App';

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
));


console.log(store.getState())
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
