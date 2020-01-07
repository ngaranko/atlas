import DATA_SELECTION_CONFIG from '../../../../src/shared/services/data-selection/data-selection-config'
import isDefined from '../../../../src/shared/services/is-defined'
;(function() {
  // This factory name is namespaced because other modules will get a similar service with the same name
  angular
    .module('dpDataSelection')
    .factory('dpDataSelectionDocumentTitle', dpDataSelectionDocumentTitleFactory)

  dpDataSelectionDocumentTitleFactory.$inject = ['lowercaseFilter']

  function dpDataSelectionDocumentTitleFactory(lowercaseFilter) {
    return {
      getTitle,
    }

    // TODO: Might be worth replacing with more advanced templating that allows conditions like Mustache (#3335)
    // eslint-disable-next-line complexity
    function getTitle(dataSelectionState, filtersState) {
      let output

      const VIEW_NAMES = {
        TABLE: 'Tabel',
        LIST: 'Lijst',
      }

      const view = VIEW_NAMES[dataSelectionState.view]
      const variant = lowercaseFilter(
        DATA_SELECTION_CONFIG.datasets[dataSelectionState.dataset].TITLE,
      )
      const markers = dataSelectionState.geometryFilter.markers || []
      const criteria = DATA_SELECTION_CONFIG.datasets[dataSelectionState.dataset].FILTERS
        // Retrieve all the active filters
        .filter(availableFilter => isDefined(filtersState[availableFilter.slug]))
        // Show the value of each active filter
        .map(activeFilter => {
          if (filtersState[activeFilter.slug] === '') {
            return `${activeFilter.label}: (Geen)`
          }
          return `${activeFilter.label}: ${filtersState[activeFilter.slug]}`
        })
        .join(', ')

      output = `${view} ${variant}`

      if (markers.length || dataSelectionState.query || criteria.length) {
        output += ' met '
      }

      if (markers.length) {
        // NB: Manual replacement of the superscript 2 is required due to improper browser rendering
        const geometryFilterDescription = dataSelectionState.geometryFilter.description.replace(
          '&sup2;',
          '²',
        )
        output += `ingetekend (${geometryFilterDescription})`
      }

      return `${output}${criteria}`
    }
  }
})()
