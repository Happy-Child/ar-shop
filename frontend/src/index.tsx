import * as dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './lib/store/store';
import { Provider } from 'react-redux';
import App from './App';
import './assets/styles/reset.css';
import './assets/styles/global.css';
import * as serviceWorker from './serviceWorker';

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
