import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import {store, persistor } from './redux/store';

import './index.css';
import App from './App';


ReactDOM.render( //BrowserRouter component is we around the Application and this component provides all of the routing functionalities that this library have to the application that sitting between this
  //we wrap the Provider around the entire appln. bcoz everything wrap inside this component have to get access to the store object we get from redux
  <Provider store={store}>
  <BrowserRouter>
  <PersistGate persistor={persistor}>
    <App />
    </PersistGate>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
