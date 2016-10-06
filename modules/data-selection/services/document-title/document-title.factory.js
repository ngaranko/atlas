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
                activeFilters;

            variant = dataSelectionConfig[dataSelectionState.dataset].TITLE;

            dataSelectionConfig[dataSelectionState.dataset].FILTERS
                //Retrieve all the active filters
                .filter(function (availableFilter) {
                    return angular.isDefined(dataSelectionState.filters[availableFilter]);
                })
                //Show the value of each active filter
                .map(function () {

                });

            dataSelectionState.
            //Paginatitel: Tabel <variant> met <criteria> - Atlas

            //Waar <variant> is 'adressen' (BAG) of 'vestigingen' (HR). De <criteria> zijn waarden van gekozen filters (comma seperated).
            return 'Tabel adressen met <criteria>';
        }
    }
})();