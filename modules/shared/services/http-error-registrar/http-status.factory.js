import {
    setGlobalError
} from '../../../../src/shared/ducks/error-message.js';

(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('httpStatus', httpStatusFactory);

    httpStatusFactory.inject = [
        '$window'
    ];

    function httpStatusFactory ($window) {
        return {
            registerError
        };

        function registerError (errorType) {
            $window.reduxStore.dispatch(setGlobalError(errorType));
        }
    }
})();
