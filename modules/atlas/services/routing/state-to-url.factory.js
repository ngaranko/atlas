import stateUrlConverter from '../../../../src/shared/services/routing/state-url-converter';

(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('stateToUrl', stateToUrlFactory);

    stateToUrlFactory.$inject = ['$location'];

    function stateToUrlFactory ($location) {
        return {
            update
        };

        function update (state, useReplace) {
            if (useReplace) {
                $location.replace();
            }
            $location.search(stateUrlConverter.state2params(state));
        }
    }
})();
