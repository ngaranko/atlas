import { getCountFromHeader } from '../support/helper-functions'
import { DATA_SELECTION_TABLE, HEADINGS } from '../support/selectors'

const ADDRESS_PAGE_SELECTORS = {
  pageUrl: '/data/bag/adressen/?modus=volledig',
  mapContainer: 'qa-map-container',
  dataSelection: '.c-data-selection',
}

const { pageUrl, mapContainer, dataSelection } = ADDRESS_PAGE_SELECTORS

describe('addresses module', () => {
  beforeEach(() => {
    cy.server()
    cy.route('/dataselectie/bag/*').as('getResults')

    // go to the addresses table
    cy.visit(pageUrl)

    // the address table should be visible
    cy.get(dataSelection)
      .should('exist')
      .and('be.visible')
  })

  describe('user should see the addresses table in full mode', () => {
    it('should open the address catalogus', () => {
      // the title should contain Adressen
      cy.get(HEADINGS.dataSelectionHeading)
        .contains('Adressen')
        .should('exist')
        .and('be.visible')

      // the map view is not visible
      cy.get(mapContainer).should('not.exist')
    })
  })

  describe('user should be able to add a filter', () => {
    it('should add the filter to the active filters and filter the results', () => {
      // get the first category
      cy.get('.qa-available-filters')
        .find('.c-data-selection-available-filters__category')
        .first()
        .then(group => {
          // get the innerText of the nested h2
          const category = group[0].children[0].innerText
          // get the innerText of the first nested li
          const selectedFilter = group[0].children[1].children[0].innerText
          // click the filter that contains the selectedFilter variable
          cy.get('.c-data-selection-available-filters__item')
            .find('.qa-option-label')
            .contains(selectedFilter)
            .click()

          cy.wait('@getResults')

          // the filter should be added to the active filters (stadsdeel)
          cy.get('.c-data-selection-active-filters__listitem')
            .find('span')
            .contains(selectedFilter)
            .should('exist')
            .and('be.visible')

          // get the position of the category in the th's of the table
          cy.get(`${DATA_SELECTION_TABLE.head} ${DATA_SELECTION_TABLE.cell}`).each((th, index) => {
            // if the position is equal to the category
            if (th[0].innerText === category) {
              // get al the content the td's with the same position as the categoryGroup they all
              // should contain the same value as the `selectedFilter`
              cy.get(DATA_SELECTION_TABLE.row)
                .find(`${DATA_SELECTION_TABLE.cell}:nth-child(${index + 1})`)
                .contains(selectedFilter)
                .should('exist')
                .and('be.visible')
            }
          })
        })
    })
  })

  describe('user should be able to navigate to the address detail view', () => {
    beforeEach(() => {
      cy.route('/bag/nummeraanduiding/*').as('getNummeraanduiding')
      cy.route('/bag/verblijfsobject/*').as('getVerblijfsobject')
      cy.route('/bag/pand/?verblijfsobjecten__id=*').as('getPanden')
      cy.route('/brk/object-expand/?verblijfsobjecten__id=*').as('getObjectExpand')
      cy.route('/monumenten/situeringen/?betreft_nummeraanduiding=*').as('getSitueringen')
      cy.route('/monumenten/monumenten/*').as('getMonument')
    })
    it('should open the detail view with the correct address', () => {
      cy.get(`${DATA_SELECTION_TABLE.head} ${DATA_SELECTION_TABLE.cell}`)
        .first()
        .then(firstTableHeader => {
          const selectedGroup = firstTableHeader[0].innerText.trim()
          cy.get(`${DATA_SELECTION_TABLE.body} ${DATA_SELECTION_TABLE.row}`)
            .first()
            .find(`${DATA_SELECTION_TABLE.cell}:nth-child(1) .qa-table-value`)
            .then(firstValue => {
              const selectedValue = firstValue[0].innerText.trim()
              // click on the firstItem to open address preview panel
              cy.get(`${DATA_SELECTION_TABLE.body} ${DATA_SELECTION_TABLE.row}`)
                .first()
                .click()

              // request the detail information
              cy.wait('@getNummeraanduiding')
              cy.wait('@getVerblijfsobject')
              cy.wait('@getPanden')
              cy.wait('@getObjectExpand')
              cy.wait('@getSitueringen')
              cy.wait('@getMonument')

              // the detail view should exist
              cy.get('.qa-detail')
                .should('exist')
                .and('be.visible')
              // the selectedGroup should exist
              cy.get('dt')
                .contains(selectedGroup)
                .should('exist')
                .and('be.visible')
              // the selectedValue should exist as a sibling
              cy.get('dt')
                .contains(selectedGroup)
                .siblings('dd')
                .contains(selectedValue)
                .should('exist')
                .and('be.visible')
            })
        })
    })
    it('should close the detail view and open the map view with the correct address', () => {
      cy.get(`${DATA_SELECTION_TABLE.head} ${DATA_SELECTION_TABLE.cell}`)
        .first()
        .then(() => {
          cy.get(`${DATA_SELECTION_TABLE.body} ${DATA_SELECTION_TABLE.row}`)
            .first()
            .find(`${DATA_SELECTION_TABLE.cell}:nth-child(1)`)
            .then(firstValue => {
              const selectedValue = firstValue[0].innerText.trim()
              // click on the firstItem to open address preview panel
              cy.get(`${DATA_SELECTION_TABLE.body} ${DATA_SELECTION_TABLE.row}`)
                .first()
                .click()
              // the detail view should exist
              cy.get('.qa-detail')
                .should('exist')
                .and('be.visible')
              // the map view maximize button should exist
              cy.get('button.icon-button__right').should('exist')
              // click on the maximize button to open the map view
              cy.get('button.icon-button__right')
                .first()
                .click()

              cy.wait('@getNummeraanduiding')
              cy.wait('@getVerblijfsobject')

              // the preview panel should exist
              cy.get('.map-preview-panel')
                .should('exist')
                .and('be.visible')
              // the preview panel has the right title
              cy.get('.map-detail-result__header-subtitle')
                .contains(selectedValue)
                .should('exist')
                .and('be.visible')
              // the show more button should exist and be visible
              cy.get('.map-search-results__button')
                .should('exist')
                .scrollIntoView()
                .and('be.visible')
            })
        })
    })
  })

  describe('user should be able to view a cursor in the leaflet map', () => {
    it('should open the detail view with a leaflet map and a cursor', () => {
      cy.route('/bag/nummeraanduiding/*').as('getNummeraanduiding')
      cy.route('/bag/verblijfsobject/*').as('getVerblijfsobject')
      cy.route('/bag/pand/?verblijfsobjecten__id=*').as('getPanden')
      cy.route('/brk/object-expand/?verblijfsobjecten__id=*').as('getObjectExpand')
      cy.route('/monumenten/situeringen/?betreft_nummeraanduiding=*').as('getSitueringen')
      cy.route('/monumenten/monumenten/*').as('getMonument')

      // click on the first item in the table
      cy.get(`${DATA_SELECTION_TABLE.body} ${DATA_SELECTION_TABLE.row}`)
        .first()
        .click()

      cy.wait('@getNummeraanduiding')
      cy.wait('@getVerblijfsobject')
      cy.wait('@getPanden')
      cy.wait('@getObjectExpand')
      cy.wait('@getSitueringen')
      cy.wait('@getMonument')

      // the cursor should still be rendered inside the leaflet map
      cy.get('.leaflet-marker-icon')
        .should('exist')
        .and('be.visible')
    })
  })

  describe('user should be be able to filter on an area', () => {
    it('should show the addresses and map when selected', () => {
      cy.route('/dataselectie/bag/geolocation/*').as('getGeoResults')

      let totalCount

      // Get the number in the title before filtering
      cy.get(HEADINGS.dataSelectionHeading).then(title => {
        totalCount = getCountFromHeader(title.text())
      })

      // click on "AMC" in the left filter menu
      cy.get('.c-data-selection-available-filters__item')
        .contains('AMC')
        .click()
      cy.wait('@getResults')

      // Expect the number in the title after filtering to be smaller than the number before
      // filtering
      cy.get(HEADINGS.dataSelectionHeading).then(title => {
        const filteredCount = getCountFromHeader(title.text())
        expect(filteredCount).to.be.below(totalCount)
      })

      // click on "kaart weergeven"
      cy.get('.c-toggle-view-button.qa-dp-link').click()
      cy.wait('@getGeoResults')

      // map should be visible now
      cy.get('.qa-map-container')
        .should('exist')
        .and('be.visible')
      // , with large right column
      cy.get('.qa-dashboard__column--right')
        .should('exist')
        .and('be.visible')
      // count the number of cluster icons on the map
      cy.get('.o-highlight-cluster').then(items => {
        expect(items.length).to.gte(1)
      })
      // list should be visible in right column
      cy.get('ul.o-list')
        .should('exist')
        .and('be.visible')
      // active filter should show
      cy.get('.c-data-selection-active-filters__listitem')
        .contains('AMC')
        .should('exist')
        .and('be.visible')
    })
  })
})
