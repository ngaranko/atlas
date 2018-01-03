import { ERROR_TYPES } from '../../../../src/shared/ducks/error-message.js';

(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('httpErrorRegistrar', httpErrorRegistrarFactory)
        .config($httpProvider => $httpProvider.interceptors.push('httpErrorRegistrar'));

    httpErrorRegistrarFactory.inject = [
        '$interval',
        '$q',
        '$rootScope',
        '$window',
        'httpStatus',
        'Raven'
    ];

    function httpErrorRegistrarFactory (
        $interval,
        $q,
        $rootScope,
        $window,
        httpStatus,
        Raven
    ) {
        return {
            // magic Angular interceptor name! see: https://docs.angularjs.org/api/ng/service/$http#interceptors
            responseError
        };

        function registerServerError () {
            httpStatus.registerError(ERROR_TYPES.SERVER_ERROR);
        }

        function registerNotFoundError () {
            httpStatus.registerError(ERROR_TYPES.NOT_FOUND_ERROR);
        }

        function responseError (response) {
            // 403
            // e.g.: connection dropped for typeahead
            console.log('response error', response);

            // Give the local response handler the time to handle an error
            // itself. See:
            // https://stackoverflow.com/questions/33605486/
            // handle-angular-http-errors-locally-with-fallback-to-global-error-handling
            $interval(() => {
                // Check if the error has already been handled locally
                const errorHandled = response.errorHandled;

                const url = response.config && response.config.url;

                // register errors (5xx) and client errors (4xx)
                let isServerError = !errorHandled && 500 <= response.status && response.status <= 599;
                const isClientError = !errorHandled && 400 <= response.status && response.status <= 499;

                if (response.status <= 0) {
                    // Check if the error is due to a cancelled http request
                    if (response.config.timeout && angular.isFunction(response.config.timeout.then)) {
                        response.config.timeout.then(
                            angular.noop, // request has been cancelled by resolving the timeout
                            () => { // Abnormal end of request
                                registerServerError();
                                httpStatus.logResponse(`HTTP request ended abnormally, ${url}`, response.status);
                            }
                        );
                    } else {
                        isServerError = true;
                    }
                }

                if (isServerError) {
                    registerServerError();
                    httpStatus.logResponse(`HTTP 5xx response, URL: ${url}`, response.status);
                } else if (isClientError) {
                    console.log('isClientError: ', isClientError);
                    console.log('response.status: ', response.status);
                    if (response.status === 401) {
                        $window.auth.logout();
                    } else if (response && response.data && response.data.detail === 'Not found.') {
                        registerNotFoundError();
                        httpStatus.logResponse(`HTTP response body: Not found, URL: ${url}`, response.status);
                    } else {
                        registerServerError();
                        httpStatus.logResponse('HTTP 4xx response', response.status);
                    }
                }
            }, 0, 1);

            return $q.reject(response);
        }
    }
})();
