(function () {
    'use strict';

    angular
        .module('dpSearchResults')
        .directive('dpSearchResultsHeader', dpSearchResultsHeaderDirective);

    dpSearchResultsHeaderDirective.$inject = ['store', 'ACTIONS', '$filter', 'searchTitle'];

    function dpSearchResultsHeaderDirective(store, ACTIONS, $filter, searchTitle) {
        return {
            scope: {
                numberOfResults: '=',
                query: '@',
                location: '=',
                category: '@'
            },
            templateUrl: 'modules/search-results/components/search-results/header/header.html',
            link: linkFn
        };

        function linkFn(scope) {
            scope.vm = {};

            scope.$watchGroup(['numberOfResults', 'category', 'query', 'location'], function() {
                var titleData = searchTitle.getTitleData(
                        scope.numberOfResults,
                        scope.query,
                        scope.location,
                        scope.category);

                scope.vm.title = titleData.title;
                scope.vm.subTitle = titleData.subTitle;
            });
        }
    }
})();
