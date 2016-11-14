(function () {
    angular
        .module('atlas')
        .run(runBlock);

    runBlock.$inject = ['applicationState', 'reducer', 'DEFAULT_STATE', 'stateToUrlMiddleware', 'stateToUrl'];

    function runBlock (applicationState, reducer, DEFAULT_STATE, stateToUrlMiddleware, stateToUrl) {
        applicationState.initialize(reducer, DEFAULT_STATE, stateToUrlMiddleware, stateToUrl);
    }
})();
