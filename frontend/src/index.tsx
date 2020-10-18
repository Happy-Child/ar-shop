import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/styles/reset.css';
import './assets/styles/global.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
