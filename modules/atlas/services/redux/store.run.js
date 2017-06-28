(function () {
    angular
        .module('atlas')
        .run(runBlock);

    runBlock.$inject = [
        'applicationState',
        'freeze',
        'reducer',
        'stateUrlConverter',
        'contextMiddleware',
        'stateToUrlMiddleware'
    ];

    function runBlock (
            applicationState,
            freeze,
            reducer,
            stateUrlConverter,
            contextMiddleware,
            stateToUrlMiddleware) {
        applicationState.initialize(
            reducer,
            stateUrlConverter,
            freeze.deepFreeze(stateUrlConverter.getDefaultState()),
            contextMiddleware,
            stateToUrlMiddleware);
    }
})();
