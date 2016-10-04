(function () {
    'use strict';

    //This factory name is namespaced because other modules will get a similar service with the same name
    angular
        .module('atlasSearchResults')
        .factory('atlasSearchResults.documentTitle', documentTitleFactory);

    function documentTitleFactory () {
        return {
            getTitle: getTitle
        };

        function getTitle (/*query, location, category*/) {
            return 'Een tekst met dezelfde logica van samenstellen als atlas-search-results-header';
        }
    }
})();