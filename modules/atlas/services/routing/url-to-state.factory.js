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
            var unwatch = $rootScope.$watch(function () {
                return $location.search();
            }, function () {
                // if (token) {
                //     onSucces, onError = go on with url without token stuff
                //     handleToken().then(onSuccess, onError);
                // } else {
                //     // normal continuation
                // }
                store.dispatch({
                    type: ACTIONS.URL_CHANGE,
                    payload: $location.search()
                });
            });

            $rootScope.$on('$destroy', unwatch);
        }
    }
})();
