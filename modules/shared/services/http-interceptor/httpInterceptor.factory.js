(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('httpInterceptor', httpInterceptorFactory)
        .config(addInterceptor);

    function httpInterceptorFactory () {
        return {
            response: function (response) {
                console.log('response');
                return response;
            },
            responseError: function (response) {
                console.log('responseError');
                return response;
            }
        };
    }

    function addInterceptor ($httpProvider) {
        console.log($httpProvider);
        $httpProvider.interceptors.push('httpInterceptor');
    }
})();
