(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('httpInterceptor', httpInterceptorFactory)
        .config($httpProvider => $httpProvider.interceptors.push('httpInterceptor'));

    httpInterceptorFactory.inject = ['$q', 'httpStatus'];

    function httpInterceptorFactory ($q, httpStatus) {
        return {
            responseError
        };

        function responseError (response) {
            // register server errors (5xx) and client errors (4xx)
            let isServerError = 500 <= response.status && response.status <= 599,
                isClientError = 400 <= response.status && response.status <= 499;

            if (isServerError) {
                httpStatus.registerError();
            } else if (isClientError && response.data.detail === "Not found.") {
                httpStatus.registerError('NOT_FOUND');
            }
            return $q.reject(response);
        }
    }
})();
