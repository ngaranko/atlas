(function () {
    'use strict';

    // This factory name is namespaced because other modules will get a similar service with the same name
    angular
        .module('dpDetail')
        .factory('dpDetailDocumentTitle', dpDetailDocumentTitleFactory);

    dpDetailDocumentTitleFactory.$inject = ['endpointParser', 'STELSELPEDIA'];

    function dpDetailDocumentTitleFactory (endpointParser, STELSELPEDIA) {
        return {
            getTitle: getTitle
        };

        function getTitle (detailState) {
            console.log('getTitle', detailState);
            return 'getTitle';
            if (angular.isObject(detailState.dataset)) {
                return 'getTitle';
            }

            const stelselpediaKey = endpointParser.getStelselpediaKey(detailState.endpoint);

            return `${STELSELPEDIA.DEFINITIONS[stelselpediaKey].label_singular}: ${detailState.display}`;
        }
    }
})();
