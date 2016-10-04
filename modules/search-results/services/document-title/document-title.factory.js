(function () {
    'use strict';

    //This factory name is namespaced because other modules will get a similar service with the same name
    angular
        .module('dpSearchResults')
        .factory('dpSearchResults.documentTitle', documentTitleFactory);

    function documentTitleFactory () {
        return {
            getTitle: getTitle
        };

        function getTitle (/*query, location, category*/) {
            return 'Een tekst met dezelfde logica van samenstellen als dp-search-results-header';
        }
    }
})();