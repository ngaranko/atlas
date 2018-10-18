import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import App from './App';
import configureStore from '../store/store';
import './angularModules';
import routes from './routes';

const history = createHistory();
const store = configureStore(history, routes);

window.reactHistory = history;

console.log( // eslint-disable-line no-console, angular/log
  `CityData: version: ${VERSION}, build: ${__BUILD_ID__}` // eslint-disable-line no-undef
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
