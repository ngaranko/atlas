import createSagaMiddleware from 'redux-saga';

import rootSaga from '../../../../src/map/sagas';

(function () {
    angular
        .module('dpShared')
        .factory('applicationState', applicationStateFactory);

    applicationStateFactory.$inject = ['$window', 'Redux'];

    function applicationStateFactory ($window, Redux) {
        let store,
            reducer,
            stateUrlConverter;

        return {
            initialize,
            getStore: () => store,
            getReducer: () => reducer,
            getStateUrlConverter: () => stateUrlConverter
        };

        function initialize (_reducer_, _stateUrlConverter_, defaultState, ...middleware) {
            reducer = _reducer_;
            stateUrlConverter = _stateUrlConverter_;

            const composeEnhancers = $window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
            const sagaMiddleware = createSagaMiddleware();
            const enhancer = composeEnhancers(
                Redux.applyMiddleware(...middleware, sagaMiddleware)
            );

            store = Redux.createStore(reducer, defaultState, enhancer);

            $window.reduxStore = store;

            sagaMiddleware.run(rootSaga);
        }
    }
})();
