(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('httpInterceptor', httpInterceptorFactory)
        .config($httpProvider => $httpProvider.interceptors.push('httpInterceptor'));

    httpInterceptorFactory.inject = ['httpStatus'];

    function httpInterceptorFactory (httpStatus) {
        return {
            response: function (response) {
                httpStatus.registerError();
                return response;
            },
            responseError: function (response) {
                httpStatus.registerError();
                return response;
            }
        };
    }
})();
