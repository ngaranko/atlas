(function () {
    'use strict';

    //This factory name is namespaced because other modules will get a similar service with the same name
    angular
        .module('dpDataSelection')
        .factory('dpDataSelection.documentTitle', documentTitleFactory);

    function documentTitleFactory () {
        return {
            getTitle: getTitle
        };

        function getTitle (/*activeFilters*/) {
            return 'Tabel adressen met <criteria>';
        }
    }
})();