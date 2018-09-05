(function () {
    angular
        .module('dpShared')
        .factory('applicationState', applicationStateFactory);

    applicationStateFactory.$inject = ['$window', 'Redux', '$timeout', '$rootScope'];

    function applicationStateFactory($window, Redux, $timeout, $rootScope) {
        let reducer,
            stateUrlConverter;

        return {
            initialize,
            getStore: () => $window.reduxStore,
            getReducer: () => reducer,
            getStateUrlConverter: () => stateUrlConverter
        };

        function initialize(_reducer_, _stateUrlConverter_, defaultState, ...middleware) {
            reducer = _reducer_;
            stateUrlConverter = _stateUrlConverter_;

            // Check if Angular component need to react to state change by subscribing to store.
            const store = $window.initializeState(Redux, _reducer_, _stateUrlConverter_, defaultState, ...middleware);
            store.subscribe(
                // istanbul ignore next
                () => {
                    $timeout(() => $rootScope.$digest());
                }
            );
        }
    }
})();
