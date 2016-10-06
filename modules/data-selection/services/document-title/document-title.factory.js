(function () {
    'use strict';

    //This factory name is namespaced because other modules will get a similar service with the same name
    angular
        .module('dpDataSelection')
        .factory('dpDataSelection.documentTitle', documentTitleFactory);

    documentTitleFactory.$inject = ['dataSelectionConfig'];

    function documentTitleFactory (dataSelectionConfig) {
        return {
            getTitle: getTitle
        };

        function getTitle (dataSelectionState) {
            var variant,
                criteria;

            variant = dataSelectionConfig[dataSelectionState.dataset].TITLE;

            criteria = dataSelectionConfig[dataSelectionState.dataset].FILTERS
                //Retrieve all the active filters
                .filter(function (availableFilter) {
                    return angular.isDefined(dataSelectionState.filters[availableFilter.slug]);
                })
                //Show the value of each active filter
                .map(function (activeFilter) {
                    return dataSelectionState.FILTERS[activeFilter.slug];
                })
                .join(', ');


            return 'Tabel ' + variant + ' met ' + criteria;
        }
    }
})();