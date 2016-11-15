(function () {
    angular
        .module('atlas')
        .run(runBlock);

    runBlock.$inject = ['applicationState', 'reducer', 'DEFAULT_STATE', 'contextMiddleware', 'stateToUrlMiddleware'];

    function runBlock (applicationState, reducer, DEFAULT_STATE, contextMiddleware, stateToUrlMiddleware) {
        applicationState.initialize(reducer, DEFAULT_STATE, contextMiddleware, stateToUrlMiddleware);
    }
})();
