import DATA_SELECTION_CONFIG
    from '../../../../src/shared/services/data-selection/data-selection-config';
import isDefined from '../../../../src/shared/services/is-defined';

(function () {
    'use strict';

    // This factory name is namespaced because other modules will get a similar service with the same name
    angular
        .module('dpDataSelection')
        .factory('dpDataSelectionDocumentTitle', dpDataSelectionDocumentTitleFactory);

    dpDataSelectionDocumentTitleFactory.$inject = ['lowercaseFilter'];

    function dpDataSelectionDocumentTitleFactory (lowercaseFilter) {
        return {
            getTitle: getTitle
        };

        // TODO: Might be worth replacing with more advanced templating that allows conditions like Mustache (#3335)
        // eslint-disable-next-line complexity
        function getTitle (dataSelectionState, filtersState) {
            let output,
                view,
                variant,
                markers,
                criteria;

            const VIEW_NAMES = {
                TABLE: 'Tabel',
                LIST: 'Lijst',
                CATALOG: 'Datasets'
            };

            if (dataSelectionState.view === 'CATALOG' &&
                !Object.keys(filtersState).length) {
                if (dataSelectionState.query) {
                    return `Datasets met '${dataSelectionState.query}'`;
                } else {
                    return 'Datasets';
                }
            } else {
                view = VIEW_NAMES[dataSelectionState.view];
                variant = lowercaseFilter(DATA_SELECTION_CONFIG.datasets[dataSelectionState.dataset].TITLE);
                markers = dataSelectionState.geometryFilter.markers || [];
                criteria = DATA_SELECTION_CONFIG.datasets[dataSelectionState.dataset].FILTERS
                    // Retrieve all the active filters
                    .filter(availableFilter => isDefined(filtersState[availableFilter.slug]))
                    // Show the value of each active filter
                    .map(activeFilter => {
                        if (filtersState[activeFilter.slug] === '') {
                            return `${activeFilter.label}: (Geen)`;
                        }
                        return `${activeFilter.label}: ${filtersState[activeFilter.slug]}`;
                    })
                    .join(', ');

                output = view;

                if (variant !== 'catalogus' && variant !== 'dcatd') {
                    output += ` ${variant}`;
                }

                if (markers.length || dataSelectionState.query || criteria.length) {
                    output += ' met ';
                }

                if (markers.length) {
                    // NB: Manual replacement of the superscript 2 is required due to improper browser rendering
                    const geometryFilterDescription = dataSelectionState.geometryFilter.description
                        .replace('&sup2;', '²');
                    output += `ingetekend (${geometryFilterDescription})`;
                }

                if (dataSelectionState.query) {
                    output += `'${dataSelectionState.query}'`;
                }

                if ((markers.length && criteria.length) || (dataSelectionState.query && criteria.length)) {
                    output += ', ';
                }

                return `${output}${criteria}`;
            }
        }
    }
})();
