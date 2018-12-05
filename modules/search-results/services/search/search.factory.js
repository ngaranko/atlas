(function () {
    'use strict';

    angular
        .module('dpSearchResults')
        .factory('search', searchFactory);

    searchFactory.$inject = ['$injector', 'api', 'searchFormatter'];

    function searchFactory ($injector, api, searchFormatter) {
        let store;

        return {
            loadMore,
            initialize
        };

        function initialize () {
        }

        function getStore () {
            store = store || $injector.get('store');
        }

        function loadMore (category) {
            getStore();
            return api.getByUrl(category.next)
                .then(function (nextPageData) {
                    // Don't change the input, create a new variable
                    var output = {};

                    output.slug = category.slug;
                    output.count = nextPageData.count;
                    output.results = category.results.concat(
                        searchFormatter.formatLinks(category.slug, nextPageData.results)
                    );

                    if (output.count > output.results.length) {
                        output.next = nextPageData._links.next.href;
                    } else {
                        output.next = null;
                    }

                    return output;
                });
        }
    }
})();
