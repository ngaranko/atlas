(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('urlToState', urlToStateFactory);

    urlToStateFactory.$inject = ['$rootScope', '$location', 'store', 'ACTIONS', 'authenticator'];

    function urlToStateFactory ($rootScope, $location, store, ACTIONS, authenticator) {
        return {
            initialize: initialize
        };

        function initialize () {
            authenticator.initialize();

            var unwatch = $rootScope.$watch(function () {
                return $location.search();
            }, function (params) {
                if (!authenticator.handleCallback(params)) {
                    store.dispatch({
                        type: ACTIONS.URL_CHANGE,
                        payload: params
                    });
                }
            });

            $rootScope.$on('$destroy', unwatch);
        }
    }
})();
