(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('httpStatus', httpStatusFactory);

    function httpStatusFactory () {
        // The sole reponsability is to register if there have been any http errors
        let errorTypes = ['SERVER', 'NOT_FOUND'],
            status = {
                hasErrors: false,
                errorType: errorTypes[0]
            };

        return {
            getStatus,
            registerError
        };

        function getStatus () {
            return status;
        }

        function registerError (errorType) {
            status.hasErrors = true;
            status.errorType = errorTypes.filter(type => type === errorType)[0] || errorTypes[0];
        }
    }
})();
