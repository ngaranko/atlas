(function () {
    'use strict';

    angular
        .module('dpSearchResults')
        .component('dpSearchResultsCategories', {
            bindings: {
                categories: '=',
                user: '<'
            },
            templateUrl: 'modules/search-results/components/search-results/categories/search-results-categories.html'
        });
})();
