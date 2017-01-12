(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('stateToUrl', stateToUrlFactory);

    stateToUrlFactory.$inject = ['$location', '$window', 'stateUrlConverter'];

    function stateToUrlFactory ($location, $window, stateUrlConverter) {
        return {
            create,
            update
        };

        function create (state) {
            const params = getParams(state);

            return '#' + Object.keys(params).reduce((result, key) => {
                if (params[key] !== null) {
                    result += result ? '&' : '?';
                    result += `${key}=${(params[key])}`;
                }
                return result;
            }, '');
        }

        function update (state, useReplace) {
            const params = getParams(state);

            if (useReplace) {
                $location.replace();
            }

            $location.search(params);
        }

        function getParams (state) {
            return stateUrlConverter.state2params(state);
        }
    }
})();
