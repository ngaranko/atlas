import stateUrlConverter from '../../../../src/shared/services/routing/state-url-converter';

import rootReducer from '../../../../src/reducers/root';

(function () {
    angular
        .module('atlas')
        .run(runBlock);

    runBlock.$inject = [
        '$timeout',
        '$rootScope',
        '$window',
        'stateToUrl'
    ];

    function runBlock (
            $timeout,
            $rootScope,
            $window,
            stateToUrl) {

        window.stateToUrl = stateToUrl

        $window.reduxStore.subscribe(() => {
            $timeout(() => $rootScope.$digest());
        });
    }
})();
