(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('httpInterceptor', httpInterceptorFactory)
        .config($httpProvider => $httpProvider.interceptors.push('httpInterceptor'));

    httpInterceptorFactory.inject = ['$q', 'httpStatus'];

    function httpInterceptorFactory ($q, httpStatus) {
        return {
            response,
            responseError
        };

        function response (response) {
            if (angular.isObject(response.data)) {

            }

            if (angular.isObject(response.data) &&
                (angular.toJson(response.data).includes('gevormd') ||
                 angular.toJson(response.data).includes('Naamgeving uitgegeven'))) {
                console.log(response.config.url.replace('https://api-acc.datapunt.amsterdam.nl/', ''),
                    response.data,
                    response.data.status);
            }

            return response;
        }

        function responseError (response) {
            // register server errors (5xx)
            let isServerError = 500 <= response.status && response.status <= 599;

            if (isServerError) {
                httpStatus.registerError();
            }
            return $q.reject(response);
        }
    }
})();
