(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('httpStatus', httpStatusFactory);

    function httpStatusFactory () {
        // The sole reponsability is to register if there have been any http errors
        const errorTypes = ['SERVER_ERROR', 'NOT_FOUND_ERROR'],
            exportObject = exportErrorTypes({
                getStatus,
                registerError
            });

        let status = {
            hasErrors: false
        };

        resetTypeFlags();

        return exportObject;

        function getStatus () {
            return status;
        }

        function registerError (errorType) {
            // Make sure the key is valid. Default to SERVER_ERROR
            const key = errorTypes.filter(type => type === errorType)[0] || errorTypes[0],
                severity = errorTypes.indexOf(key),
                isMoreImportant = severity > status.severity;

            // If an error already exists: only update if the new one is more
            // important
            if (!status.hasErrors || isMoreImportant) {
                resetTypeFlags();
                status.severity = severity;
                status[key] = true;
                status.hasErrors = true;
            }
        }

        function resetTypeFlags () {
            errorTypes.forEach(key => {
                status[key] = false;
            });
        }

        function exportErrorTypes (object) {
            errorTypes.forEach(key => {
                object[key] = key;
            });

            return object;
        }
    }
})();
