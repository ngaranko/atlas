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
            if (authenticator.isAuthenticated()) {
                store.dispatch({
                    type: ACTIONS.USER_AUTHENTICATED,
                    payload: true
                });
                store.dispatch({
                    type: ACTIONS.USER_SCOPES,
                    payload: authenticator.getScopes()
                });
            }
            $location.path(''); // Make sure the default `/` is always used. Resulting in `/#/?etc`

            var unwatch = $rootScope.$watch(function () {
                return $location.search();
            }, function (params) {
                store.dispatch({
                    type: ACTIONS.URL_CHANGE,
                    payload: params
                });
            });

            $rootScope.$on('$destroy', unwatch);
        }
    }
})();
