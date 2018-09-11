import stateUrlConverter from '../../../../src/shared/services/routing/state-url-converter';

(function () {
    angular
        .module('dpShared')
        .factory('applicationState', applicationStateFactory);

    applicationStateFactory.$inject = ['$window', 'Redux'];

    function applicationStateFactory ($window, Redux) {
        let reducer;

        return {
            initialize,
            getStore: () => $window.reduxStore,
            getReducer: () => reducer,
            getStateUrlConverter: () => stateUrlConverter
        };

        function initialize (_reducer_, defaultState, ...middleware) {
            reducer = _reducer_;

            $window.initializeState(Redux, _reducer_, defaultState, ...middleware);
        }
    }
})();
