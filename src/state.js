import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';

import rootSaga from './root-saga';
import './shared/ducks/error-message';
import './map/ducks/click-location/map-click-location';
import * as auth from './shared/services/auth/auth';
import { authenticateUser } from './reducers/user';
import { fetchCatalogFilters } from './catalog/ducks/data-selection/data-selection-catalog';
import rootReducer from './reducers/root';
import stateUrlConverter from './shared/services/routing/state-url-converter';
import { ENVIRONMENTS, getEnvironment } from './shared/environment';
import freeze from './shared/services/freeze/freeze';
import contextMiddleware from './shared/services/context/context-middleware';
import stateToUrlMiddleware
  from './shared/services/state-to-url/state-to-url-middleware';
import locationHandlerCreator from './location-handler';

window.reducer = rootReducer;

export default function initialize(reducer, defaultState, ...middleware) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = composeEnhancers(
    applyMiddleware(...middleware, sagaMiddleware)
  );

  window.reduxStore = createStore(reducer, defaultState, enhancer);

  sagaMiddleware.run(rootSaga);

  try {
    auth.initAuth();
  } catch (error) {
    window.Raven.captureMessage(error);
  }

  const returnPath = auth.getReturnPath();
  if (returnPath) {
    // Timeout needed because the change is otherwise not being handled in
    // Firefox browsers. This is possibly due to AngularJS changing the
    // `location.hash` at the same time.
    window.setTimeout(() => {
      location.hash = returnPath;
    });
  }

  const accessToken = auth.getAccessToken();
  if (accessToken) {
    window.reduxStore.dispatch(authenticateUser(auth.getAccessToken(), auth.getName(),
      auth.getScopes()));
  }

  window.reduxStore.dispatch(fetchCatalogFilters());

  const history = createHistory();
  const locationHandler = locationHandlerCreator(window.reduxStore);
  // eslint-disable-next-line no-unused-vars
  const unlisten = history.listen(locationHandler);
  // Handle first page load URL
  locationHandler(window.location);

  const event = document.createEvent('Event');
  event.initEvent('bootstrapAngular', false, true);
  window.allowAngularToBootstrap = true;
  document.body.dispatchEvent(event);

  return window.reduxStore;
}

window.initializeState = initialize;

const urlDefaultState = stateUrlConverter.getDefaultState();

function environment() {
  const config = {
    NAME: getEnvironment(window.location.hostname)
  };
  config.isDevelopment = () => config.NAME === ENVIRONMENTS.DEVELOPMENT;
  return config;
}

const initialState = environment().isDevelopment() ? freeze(urlDefaultState) : urlDefaultState;

initialize(
  rootReducer,
  initialState,
  contextMiddleware,
  stateToUrlMiddleware
);

