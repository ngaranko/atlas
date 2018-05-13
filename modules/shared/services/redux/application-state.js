import * as Redux from 'redux';
const applicationState = () => {
    let reducer,
        stateUrlConverter;

    return {
        initialize,
        getStore: () => window.reduxStore,
        getReducer: () => reducer,
        getStateUrlConverter: () => stateUrlConverter
    };

    function initialize (_reducer_, _stateUrlConverter_, defaultState, ...middleware) {
        reducer = _reducer_;
        stateUrlConverter = _stateUrlConverter_;

        window.initializeState(Redux, _reducer_, _stateUrlConverter_, defaultState, ...middleware);
    }
};

export default applicationState();

