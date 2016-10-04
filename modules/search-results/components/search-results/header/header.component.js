(function () {
    'use strict';

    angular
        .module('dpSearchResults')
        .component('dpSearchResultsHeader', {
            bindings: {
                numberOfResults: '=',
                query: '@',
                location: '=',
                category: '@'
            },
            templateUrl: 'modules/search-results/components/search-results/header/header.html',
            controllerAs: 'vm'
        });
})();