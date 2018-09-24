import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import App from './App';
import configureStore, { history } from '../store';
import './angularModules';
import reduxWatcher from '../shared/services/redux-watcher/redux-watcher';

const store = configureStore();

reduxWatcher(store);

window.reactHistory = history;

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App history={history} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// (function (orig) {
//   angular.modules = [];
//   angular.module = function () {
//     if (arguments.length > 1) {
//       angular.modules.push(arguments[0]);
//     }
//     return orig.apply(null, arguments);
//   };
// })(angular.module);
