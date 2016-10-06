(function () {
    'use strict';

    //This factory name is namespaced because other modules will get a similar service with the same name
    angular
        .module('dpDetail')
        .factory('dpDetailDocumentTitle', dpDetailDocumentTitleFactory);

    dpDetailDocumentTitleFactory.$inject = ['STELSELPEDIA'];

    function dpDetailDocumentTitleFactory (STELSELPEDIA) {
        return {
            getTitle: getTitle
        };

        function getTitle (endpoint, display) {
            var anchor,
                stelselpediaDefinition;

            anchor = document.createElement('a');
            anchor.href = endpoint;

            stelselpediaDefinition = anchor.pathname.split('/')[2].toUpperCase();

            return STELSELPEDIA.DEFINITIONS[stelselpediaDefinition].label_singular + ': ' + display;
        }
    }
})();