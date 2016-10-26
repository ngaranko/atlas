(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('httpStatus', httpStatusFactory);

    function httpStatusFactory () {
        // The sole reponsability is to register if there have been any http errors
        let status = {
            hasErrors: false
        };

        return {
            clearErrors,
            getStatus,
            hasErrors,
            registerError
        };

        function clearErrors () {
            status.hasErrors = false;
        }

        function getStatus () {
            return status;
        }

        function hasErrors () {
            return status.hasErrors;
        }

        function registerError () {
            status.hasErrors = true;
        }
    }
})();
