import * as Redux from 'redux';
import stateUrlConverter from '../../../../src/shared/services/routing/state-url-converter';

const applicationState = () => {
    let reducer;
    return {
        initialize,
        getStore: () => window.reduxStore,
        getReducer: () => reducer,
        getStateUrlConverter: () => stateUrlConverter
    };

    function initialize (_reducer_, defaultState, ...middleware) {
        reducer = _reducer_;

        window.initializeState(Redux, _reducer_, defaultState, ...middleware);
    }
};

export default applicationState();

