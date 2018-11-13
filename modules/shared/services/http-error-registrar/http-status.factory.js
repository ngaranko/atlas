import {
    setGlobalError
} from '../../../../src/shared/ducks/error-message';

(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('httpStatus', httpStatusFactory);

    httpStatusFactory.$inject = [
        '$window'
        // 'Raven' // TODO: refactor, restore
    ];

    function httpStatusFactory ($window) {
        return {
            logResponse,
            registerError
        };

        function logResponse (message, statusCode) {
            // TODO: refactor, restore
            // Raven.captureMessage(new Error(message), { tags: { statusCode } });
        }

        function registerError (errorType) {
            $window.reduxStore.dispatch(setGlobalError(errorType));
        }
    }
})();
