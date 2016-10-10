(function () {
    'use strict';

    //This factory name is namespaced because other modules will get a similar service with the same name
    angular
        .module('dpSearchResults')
        .factory('dpSearchResults.documentTitle', documentTitleFactory);
    documentTitleFactory.$inject = ['searchTitle'];

    function documentTitleFactory (searchTitle) {
        return {
            getTitle: getTitle
        };

        function getTitle(searchState) {
            var titleData = searchState ? searchTitle.getTitleData(
                        searchState.query,
                        searchState.location,
                        searchState.category,
                        searchState.numberOfResults) : null,
                baseTitle = (titleData && titleData.title) ? titleData.title : '',
                title = (baseTitle && titleData.subTitle) ? baseTitle + ' – ' + titleData.subTitle : baseTitle;

            return title;
        }
    }
})();
