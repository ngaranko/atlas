import {
    ERROR_TYPES,
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
        // The sole reponsability is to register if there have been any http errors
        const errorTypes = ['SERVER_ERROR', 'NOT_FOUND_ERROR', 'LOGIN_ERROR'];
        const exportObject = exportErrorTypes({
            getStatus,
            registerError
        });

        const currentStatus = {
            hasErrors: false
        };

        resetTypeFlags();

        return exportObject;

        function getStatus () {
            // console.log('currentStatus: ', currentStatus);
            return currentStatus;
        }

        function registerError (errorType) {
            console.log('errorType: ', errorType);
            // Make sure the key is valid. Default to SERVER_ERROR
            const key = errorTypes.filter(type => type === errorType)[0] || errorTypes[0];

            $window.reduxStore.dispatch(setGlobalError(key));

            // if (!currentStatus.hasErrors) {
            //     resetTypeFlags();
            // }

            // currentStatus[key] = true;
            // currentStatus.hasErrors = true;
        }

        function resetTypeFlags () {
            errorTypes.forEach(key => {
                currentStatus[key] = false;
            });
        }

        // TODO replace with export
        function exportErrorTypes (object) {
            errorTypes.forEach(key => {
                object[key] = key;
            });

            return object;
        }
    }
})();
