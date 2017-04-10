(function () {
    'use strict';

    // This factory name is namespaced because other modules will get a similar service with the same name
    angular
        .module('dpDataSelection')
        .factory('dpDataSelectionDocumentTitle', dpDataSelectionDocumentTitleFactory);

    dpDataSelectionDocumentTitleFactory.$inject = ['DATA_SELECTION_CONFIG'];

    function dpDataSelectionDocumentTitleFactory (DATA_SELECTION_CONFIG) {
        return {
            getTitle: getTitle
        };

        function getTitle (dataSelectionState) {
            let output,
                view,
                variant,
                criteria;

            const VIEW_NAMES = {
                TABLE: 'Tabel',
                LIST: 'Lijst',
                CARDS: 'Dataset'
            };

            if (dataSelectionState.view === 'CARDS' && Object.keys(dataSelectionState.filters).length === 0) {
                if (dataSelectionState.query) {
                    return `Datasets met '${dataSelectionState.query}'`;
                } else {
                    return 'Alle datasets';
                }
            } else {
                view = VIEW_NAMES[dataSelectionState.view];
                variant = DATA_SELECTION_CONFIG.datasets[dataSelectionState.dataset].TITLE;
                criteria = DATA_SELECTION_CONFIG.datasets[dataSelectionState.dataset].FILTERS
                // Retrieve all the active filters
                    .filter(availableFilter => angular.isDefined(dataSelectionState.filters[availableFilter.slug]))
                    // Show the value of each active filter
                    .map(activeFilter => dataSelectionState.filters[activeFilter.slug])
                    .join(', ');

                output = view + ' ' + variant;

                if (dataSelectionState.query || criteria.length) {
                    output += ' met ';
                }

                if (dataSelectionState.query) {
                    output += `'${dataSelectionState.query}'`;
                }

                if (dataSelectionState.query && criteria.length) {
                    output += ', ';
                }

                if (criteria.length) {
                    output += criteria;
                }

                return output;
            }
        }
    }
})();
