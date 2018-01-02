(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('httpErrorRegistrar', httpErrorRegistrarFactory)
        .config($httpProvider => $httpProvider.interceptors.push('httpErrorRegistrar'));

    httpErrorRegistrarFactory.inject = [
        '$log',
        '$rootScope',
        '$window',
        '$q',
        '$interval',
        'httpStatus',
        'Raven'];

    function httpErrorRegistrarFactory (
        $log,
        $rootScope,
        $window,
        $q,
        $interval,
        httpStatus,
        Raven
    ) {
        // TODO Move general error handling out of Angular!
        $window.addEventListener('error', function (event) {
            // Initiated by browser without Raven/Sentry intervening.
            // Fired when asset load from HTML fails.
            // e.g. Piwik fails to load, or a tile is not loaded.
            // The cause of the error may be that the connection is dropped.

            // not fired on exceptions
            // not fired on syntax error inside Angular
            // not fired on 403, 404 or 500
            let message = event.message || 'window error event';
            if (event.target && event.target.src) {
                // URL load error
                if (event.target.src === 'https://piwik.data.amsterdam.nl/piwik.js') {
                    $log.error('piwik load error', event);
                    return; // Don't log error in Sentry and don't set error state
                }

                // Notify our application of error
                message += `, HTTP external request error, src: ${event.target.src}`;
                $rootScope.$applyAsync(() => {
                    registerNetworkError();
                });
            }

            // Log exception in Sentry, use error object if available
            if (event.error) {
                Raven.captureException(event.error, {
                    extra: { message }
                });
            } else {
                logResponse(message);
            }
        }, true);

        return {
            responseError // name is used by Angular, see: https://docs.angularjs.org/api/ng/service/$http#interceptors
        };

        function logResponse (message, statusCode) {
            Raven.captureMessage(new Error(message), { tags: { statusCode } });
        }

        function registerServerError () {
            httpStatus.registerError(httpStatus.SERVER_ERROR);
        }

        function registerNotFoundError () {
            httpStatus.registerError(httpStatus.NOT_FOUND_ERROR);
        }

        function responseError (response) {
            // Give the local response handler the time to handle an error
            // itself. See:
            // https://stackoverflow.com/questions/33605486/
            // handle-angular-http-errors-locally-with-fallback-to-global-error-handling
            $interval(() => {
                // Check if the error has already been handled locally
                const errorHandled = response.errorHandled;

                const url = response.config && response.config.url;

                // register server errors (5xx) and client errors (4xx)
                let isServerError = !errorHandled && 500 <= response.status && response.status <= 599;
                const isClientError = !errorHandled && 400 <= response.status && response.status <= 499;

                if (response.status <= 0) {
                    // Check if the error is due to a cancelled http request
                    if (response.config.timeout && angular.isFunction(response.config.timeout.then)) {
                        response.config.timeout.then(
                            angular.noop, // request has been cancelled by resolving the timeout
                            () => { // Abnormal end of request
                                registerServerError();
                                logResponse(`HTTP request ended abnormally, ${url}`, response.status);
                            }
                        );
                    } else {
                        isServerError = true;
                    }
                }

                if (isServerError) {
                    registerServerError();
                    logResponse(`HTTP 5xx response, URL: ${url}`, response.status);
                } else if (isClientError) {
                    if (response.status === 401) {
                        $window.auth.logout();
                    } else if (response && response.data && response.data.detail === 'Not found.') {
                        registerNotFoundError();
                        logResponse(`HTTP response body: Not found, URL: ${url}`, response.status);
                    } else {
                        registerServerError();
                        logResponse('HTTP 4xx response', response.status);
                    }
                }
            }, 0, 1);

            return $q.reject(response);
        }
    }
})();
