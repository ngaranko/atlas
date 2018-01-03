import {
    setGlobalError
} from '../../../../src/shared/ducks/error-message.js';

(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('httpStatus', httpStatusFactory);

    httpStatusFactory.inject = [
        '$window',
        'Raven'
    ];

    function httpStatusFactory ($window, Raven) {
        return {
            logResponse,
            registerError
        };

        function logResponse (message, statusCode) {
            Raven.captureMessage(new Error(message), { tags: { statusCode } });
        }

        function registerError (errorType) {
            $window.reduxStore.dispatch(setGlobalError(errorType));
        }
    }
})();
