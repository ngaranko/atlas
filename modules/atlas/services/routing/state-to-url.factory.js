(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('stateToUrl', stateToUrlFactory);

    stateToUrlFactory.$inject = ['$location', 'stateUrlConverter'];

    function stateToUrlFactory ($location, stateUrlConverter) {
        return {
            update
        };

        function encodeQueryParams (params) {
            return (Object.keys(params).
                map((param) => `${encodeURIComponent(param)}=${encodeURIComponent(params[param])}`).
                join('&'));
        }

        function update (state, useReplace) {
            // don't add the url to history when is the same url or when the action should skip that
            useReplace = useReplace ||
                encodeQueryParams($location.search()) === encodeQueryParams(stateUrlConverter.state2params(state));
            if (useReplace) {
                $location.replace();
            }
            $location.search(stateUrlConverter.state2params(state));
        }
    }
})();
