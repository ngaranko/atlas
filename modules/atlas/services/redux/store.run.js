import stateUrlConverter from '../../../../src/shared/services/routing/state-url-converter';

import rootReducer from '../../../../src/reducers/root';

(function () {
    angular
        .module('atlas')
        .run(runBlock);

    runBlock.$inject = [
        '$timeout',
        '$rootScope',
        'applicationState',
        'freeze',
        'contextMiddleware',
        'stateToUrlMiddleware',
        'environment'
    ];

    function runBlock (
            $timeout,
            $rootScope,
            applicationState,
            freeze,
            contextMiddleware,
            stateToUrlMiddleware,
            environment) {
        const urlDefaultState = stateUrlConverter.getDefaultState();
        const initialState = environment.isDevelopment() ? freeze.deepFreeze(urlDefaultState) : urlDefaultState;

        const store = applicationState.initialize(
            rootReducer,
            initialState,
            contextMiddleware,
            stateToUrlMiddleware);

        store.subscribe(() => {
            $timeout(() => $rootScope.$digest());
        });
    }
})();
