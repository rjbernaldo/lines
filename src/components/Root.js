import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { compose, createStore } from 'redux';

import App from './App';
import rootReducer from '../reducers';

const store = compose()(createStore)(rootReducer);

const Root = ({ routes }) => (
  <Provider store={store}>
    <BrowserRouter>
      {routes()}
    </BrowserRouter>
  </Provider>
);

export default Root;
