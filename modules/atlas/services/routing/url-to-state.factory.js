(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('urlToState', urlToStateFactory);

    urlToStateFactory.$inject = ['$rootScope', '$location', 'store', 'ACTIONS'];

    function urlToStateFactory ($rootScope, $location, store, ACTIONS) {
        return {
            initialize: initialize
        };

        function initialize () {
            /* eslint-disable angular/on-watch */
            $rootScope.$watch(function () {
                /* eslint-enable angular/on-watch */
                return $location.search();
            }, function () {
                store.dispatch({
                    type: ACTIONS.URL_CHANGE,
                    payload: $location.search()
                });
            });
        }
    }
})();
