(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('urlToState', urlToStateFactory);

    urlToStateFactory.$inject = ['$rootScope', '$location', 'store', 'ACTIONS'];

    function urlToStateFactory($rootScope, $location, store, ACTIONS) {
        return {
            initialize: initialize
        };

        function initialize() {
            var unwatch = $rootScope.$on('$locationChangeSuccess', function (event) {
                var params = $location.search();
                
                store.dispatch({
                    type: ACTIONS.URL_CHANGE,
                    payload: params
                });
            });

            $rootScope.$on('$destroy', unwatch);
        }
    }
})();
