import { compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './map/sagas';

export default function initialize(Redux, reducer, stateUrlConverter, defaultState, ...middleware) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = composeEnhancers(
    Redux.applyMiddleware(...middleware, sagaMiddleware)
  );

  window.reduxStore = createStore(reducer, defaultState, enhancer);

  sagaMiddleware.run(rootSaga);
}

window.initializeState = initialize;
