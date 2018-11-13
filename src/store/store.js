import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connectRoutes } from 'redux-first-router';
import restoreScroll from 'redux-first-router-restore-scroll';
import queryString from 'querystring';
import rootSaga from '../root-saga';
import '../shared/ducks/error-message';
import * as auth from '../shared/services/auth/auth';
import { authenticateUser } from '../shared/ducks/user/user';
import rootReducer from '../reducers/root';
import documentHeadMiddleware from './middleware/documentHead';
import piwikMiddleware from './middleware/piwikMiddleware';

window.reducer = rootReducer;

const configureStore = (history, routesMap) => {
  const {
    reducer: routeReducer,
    middleware: routeMiddleware,
    enhancer: routeEnhancer,
    initialDispatch: initialRouteDispatch
  } = connectRoutes(
    history,
    routesMap,
    {
      querySerializer: queryString,
      restoreScroll: restoreScroll(),
      initialDispatch: false
    }
  );

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = composeEnhancers(
    routeEnhancer,
    applyMiddleware(
      documentHeadMiddleware,
      piwikMiddleware,
      routeMiddleware,
      sagaMiddleware
    )
  );

  window.reduxStore = createStore(rootReducer(routeReducer), undefined, enhancer);

  sagaMiddleware.run(rootSaga);
  initialRouteDispatch();

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

  return window.reduxStore;
};

export default configureStore;
