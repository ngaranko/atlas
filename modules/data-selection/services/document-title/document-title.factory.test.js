import * as dataSelectionConfig from '../../../../src/shared/services/data-selection/data-selection-config'

describe('The dpDataSelectionDocumentTitle factory', function() {
  let dpDataSelectionDocumentTitle
  let mockedBagState
  let mockedHrState
  let mockedCatalogusState
  let mockedFilters

  beforeEach(function() {
    const config = {
      datasets: {
        bag: {
          TITLE: 'Adressen',
          TITLE_TAB: 'Adressen',
          FILTERS: [
            {
              slug: 'stadsdeel_naam',
              label: 'Stadsdeel',
            },
            {
              slug: 'buurt_naam',
              label: 'Buurt',
            },
            {
              slug: 'postcode',
              label: 'Postcode',
            },
          ],
        },
        hr: {
          TITLE: 'Handelsregister',
          TITLE_TAB: 'Handelsregister',
          FILTERS: [],
        },
        dcatd: {
          TITLE: 'Catalogus',
          TITLE_TAB: 'Catalogus',
          FILTERS: [
            {
              slug: 'groups',
              label: "Thema's",
            },
          ],
        },
      },
    }

    dataSelectionConfig.default = config
    angular.mock.module('dpDataSelection')

    angular.mock.inject(function(_dpDataSelectionDocumentTitle_) {
      dpDataSelectionDocumentTitle = _dpDataSelectionDocumentTitle_
    })

    mockedBagState = {
      dataset: 'bag',
      view: 'TABLE',
      geometryFilter: {},
    }

    mockedHrState = {
      dataset: 'hr',
      view: 'TABLE',
      geometryFilter: {},
    }

    mockedCatalogusState = {
      dataset: 'dcatd',
      view: 'CATALOG',
      query: 'my query',
      geometryFilter: {},
    }

    mockedFilters = {}
  })

  it('shows a different title based on the active view', function() {
    expect(dpDataSelectionDocumentTitle.getTitle(mockedBagState, mockedFilters)).toMatch(/^Tabel/)

    mockedBagState.view = 'LIST'
    expect(dpDataSelectionDocumentTitle.getTitle(mockedBagState, mockedFilters)).toMatch(/^Lijst/)
  })

  it('shows a special title when showing all datasets', function() {
    delete mockedCatalogusState.query
    expect(dpDataSelectionDocumentTitle.getTitle(mockedCatalogusState, mockedFilters)).toBe(
      'Datasets',
    )
  })

  it('shows a the datasets query for text search in datasets', function() {
    expect(dpDataSelectionDocumentTitle.getTitle(mockedCatalogusState, mockedFilters)).toBe(
      "Datasets met 'my query'",
    )
  })

  it('shows both the query and the active filter', function() {
    mockedFilters.groups = 'bestuur-en-organisatie'
    expect(dpDataSelectionDocumentTitle.getTitle(mockedCatalogusState, mockedFilters)).toBe(
      "Datasets met 'my query', Thema's: bestuur-en-organisatie",
    )
  })

  it('shows the surface of the current selection', function() {
    mockedBagState.geometryFilter = {
      description: '1,95 km en 216.980,2 m&sup2;',
      markers: [{}, {}],
    }

    expect(dpDataSelectionDocumentTitle.getTitle(mockedBagState, mockedFilters)).toBe(
      'Tabel adressen met ingetekend (1,95 km en 216.980,2 m²)',
    )
  })

  it('shows the title of the current dataset', function() {
    expect(dpDataSelectionDocumentTitle.getTitle(mockedBagState, mockedFilters)).toBe(
      'Tabel adressen',
    )

    expect(dpDataSelectionDocumentTitle.getTitle(mockedHrState, mockedFilters)).toBe(
      'Tabel handelsregister',
    )
  })

  it('optionally lists the (selected values of the) active filters', function() {
    // One active filter
    mockedFilters.stadsdeel_naam = 'Oost'
    expect(dpDataSelectionDocumentTitle.getTitle(mockedBagState, mockedFilters)).toBe(
      'Tabel adressen met Stadsdeel: Oost',
    )

    // Two active filters (comma-separated)
    mockedFilters.buurt_naam = 'Flevopark'
    expect(dpDataSelectionDocumentTitle.getTitle(mockedBagState, mockedFilters)).toBe(
      'Tabel adressen met Stadsdeel: Oost, Buurt: Flevopark',
    )

    // Two active filters (comma-separated_
    mockedFilters.postcode = ''
    expect(dpDataSelectionDocumentTitle.getTitle(mockedBagState, mockedFilters)).toBe(
      'Tabel adressen met Stadsdeel: Oost, Buurt: Flevopark, Postcode: (Geen)',
    )
    // double space before "zonder postcode", the browser strips this
  })

  it('respects the filter order from DATA_SELECTION_CONFIG', function() {
    mockedFilters = {
      stadsdeel_naam: 'Oost',
      buurt_naam: 'Flevopark',
    }

    expect(dpDataSelectionDocumentTitle.getTitle(mockedBagState, mockedFilters)).toBe(
      'Tabel adressen met Stadsdeel: Oost, Buurt: Flevopark',
    )
  })
})
