(function () {
    angular
        .module('dpShared')
        .factory('applicationState', applicationStateFactory);

    applicationStateFactory.$inject = ['Redux'];

    function applicationStateFactory (Redux) {
        let store,
            reducer;

        return {
            initialize,
            getStore: () => store,
            getReducer: () => reducer
        };

        function initialize (_reducer_, defaultState, middleware) {
            var enhancer = Redux.applyMiddleware(middleware);
            reducer = _reducer_;

            store = Redux.createStore(reducer, defaultState, enhancer);
        }
    }
})();
