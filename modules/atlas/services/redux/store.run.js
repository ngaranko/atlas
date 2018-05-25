import stateUrlConverter from '../../../../src/shared/services/routing/state-url-converter';

(function () {
    angular
        .module('atlas')
        .run(runBlock);

    runBlock.$inject = [
        'applicationState',
        'freeze',
        'reducer',
        'contextMiddleware',
        'stateToUrlMiddleware',
        'environment'
    ];

    function runBlock (
            applicationState,
            freeze,
            reducer,
            contextMiddleware,
            stateToUrlMiddleware,
            environment) {
        const urlDefaultState = stateUrlConverter.getDefaultState();
        const initialState = environment.isDevelopment() ? freeze.deepFreeze(urlDefaultState) : urlDefaultState;
        applicationState.initialize(
            reducer,
            initialState,
            contextMiddleware,
            stateToUrlMiddleware);
    }
})();
