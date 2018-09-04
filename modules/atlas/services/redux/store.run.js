import rootReducer from '../../../../src/reducers/root';

(function () {
    angular
        .module('atlas')
        .run(runBlock);

    runBlock.$inject = [
        'applicationState',
        'freeze',
        'stateUrlConverter',
        'contextMiddleware',
        'stateToUrlMiddleware',
        'environment'
    ];

    function runBlock (
            applicationState,
            freeze,
            stateUrlConverter,
            contextMiddleware,
            stateToUrlMiddleware,
            environment) {
        const urlDefaultState = stateUrlConverter.getDefaultState();
        const initialState = environment.isDevelopment() ? freeze.deepFreeze(urlDefaultState) : urlDefaultState;

        applicationState.initialize(
            rootReducer,
            stateUrlConverter,
            initialState,
            contextMiddleware,
            stateToUrlMiddleware);
    }
})();
