import * as Redux from 'redux';
import stateUrlConverter from '../routing/state-url-converter';

const applicationState = () => {
  let reducer;

  function initialize(_reducer_, defaultState, ...middleware) {
    reducer = _reducer_;

    window.initializeState(Redux, _reducer_, defaultState, ...middleware);
  }

  return {
    initialize,
    getStore: () => window.reduxStore,
    getReducer: () => reducer,
    getStateUrlConverter: () => stateUrlConverter
  };
};

export default applicationState();

