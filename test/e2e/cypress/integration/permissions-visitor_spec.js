import { queries, urls, values } from '../support/permissions-constants'
import { DATA_SELECTION_TABLE } from '../support/selectors'

describe('visitor permissions', () => {
  it('0. Should NOT show "Kadastrale subjecten" in the autocomplete', () => {
    cy.server()
    cy.route('/typeahead?q=bakker').as('getResults')

    cy.visit('/')

    cy.get('#auto-suggest__input')
      .focus()
      .type('bakker')

    cy.wait('@getResults')
    cy.get('.auto-suggest__tip')
      .should('exist')
      .and('be.visible')
    cy.get(queries.autoSuggestHeader).should($values => {
      expect($values).to.not.contain(values.kadastraleSubjecten)
    })
  })

  it('1. Should show a message after search is performed', () => {
    cy.server()
    cy.defineSearchRoutes()

    cy.visit('/')

    cy.get('#auto-suggest__input')
      .focus()
      .type('bakker{enter}')

    cy.waitForSearch(false)
    cy.get(queries.warningPanel).contains('Meer resultaten na inloggen')
    cy.get(queries.searchHeader).should($values => {
      expect($values).to.not.contain(values.kadastraleSubjecten)
    })
  })

  it('2A. Should NOT allow a visitor to view a natural subject', () => {
    cy.visit(urls.natuurlijk)

    cy.get(queries.warningPanelAngular)
      .scrollIntoView()
      .contains('Medewerkers/ketenpartners van Gemeente Amsterdam')
    cy.get(queries.headerTitle).should('not.exist')
    cy.get(queries.natuurlijkPersoon).should('not.exist')
  })

  it('2B. Should NOT allow a visitor to view a non-natural subject', () => {
    cy.visit(urls.nietNatuurlijk)

    cy.get(queries.warningPanelAngular).contains('Medewerkers/ketenpartners van Gemeente Amsterdam')
    cy.get(queries.headerTitle).should('not.exist')
    cy.get(queries.nietNatuurlijkPersoon).should('not.exist')
  })

  it('3. Should show a visitor limited info for a cadastral subject', () => {
    cy.server()
    cy.route('/brk/object/*').as('getResults')
    cy.route('/brk/object-expand/*').as('getObjectExpand')
    cy.route('/bag/nummeraanduiding/?kadastraalobject=*').as('getNummeraanduidingen')

    cy.visit(urls.business)

    cy.wait('@getResults')
    cy.wait('@getObjectExpand')
    cy.wait('@getNummeraanduidingen')
    cy.get(queries.warningPanelAngular).contains('Medewerkers/ketenpartners van Gemeente Amsterdam')
    cy.get(queries.headerTitle).contains('A 0001')
    cy.get(queries.headerSubTitle).should($values => {
      expect($values).to.not.contain(values.aantekeningen)
    })
  })

  it('4. Should show a visitor limited info for an address', () => {
    cy.server()
    cy.route('/bag/verblijfsobject/*').as('getVerblijfsobject')
    cy.route('/bag/nummeraanduiding/*').as('getNummeraanduiding')
    cy.route('/bag/pand/?verblijfsobjecten__id=*').as('getPanden')
    cy.route('/brk/object-expand/?verblijfsobjecten__id=*').as('getObjectExpand')
    cy.route('/monumenten/monumenten/*').as('getMonument')
    cy.route('/monumenten/situeringen/?betreft_nummeraanduiding=*').as('getSitueringen')

    cy.visit(urls.address)

    cy.wait('@getVerblijfsobject')
    cy.wait('@getMonument')
    cy.wait('@getNummeraanduiding')
    cy.wait('@getObjectExpand')
    cy.wait('@getPanden')
    cy.wait('@getSitueringen')
    cy.get(queries.headerTitle).contains('Dam 1')
    cy.get(queries.headerSubTitle).should($values => {
      expect($values).to.contain('Ligt in')
      expect($values).to.contain('Panoramabeeld')
      expect($values).to.contain('Verblijfsobject')
      expect($values).to.contain('Panden')
      expect($values).to.contain('Vestigingen')
      expect($values).to.contain('Kadastrale objecten')
      expect($values).to.contain('Monumenten')
      expect($values).to.not.contain(values.zakelijkeRechten)
    })
    cy.get(queries.warningPanelAngular).contains('Medewerkers/ketenpartners van Gemeente Amsterdam')
  })

  it('5. Should show a visitor limited info for "Gemeentelijke beperking"', () => {
    cy.server()
    cy.route('/wkpb/beperking/*').as('getResults')
    cy.route('/wkpb/brondocument/?beperking=*').as('getBronDocument')
    cy.route('/brk/object/?beperkingen__id=*').as('getObject')

    cy.visit(urls.gemeentelijkeBeperking)

    cy.wait('@getResults')
    cy.wait('@getBronDocument')
    cy.wait('@getObject')
    cy.get(queries.warningPanelAngular).contains('Medewerkers/ketenpartners van Gemeente Amsterdam')
    cy.get(queries.headerTitle).contains('142')
    cy.get(queries.keyValueList)
      .contains(values.documentnaam)
      .should('not.exist')
  })

  it('6. Should show a visitor a notification for limited map layers', () => {
    cy.visit(urls.map)

    // the map-panel should have the class collapsed by default
    cy.get('.map-panel').should('have.class', 'map-panel--collapsed')
    // expand the map-panel
    cy.get('.map-panel__toggle').click()
    // the map panel should have the class expanded
    cy.get('.map-panel').should('have.class', 'map-panel--expanded')

    cy.get(queries.mapLayersCategory).should($values => {
      expect($values).to.contain(values.economieEnHaven)
      expect($values).to.contain(values.geografie)
      expect($values).to.contain(values.bedrijvenInvloedsgebieden)
    })
    cy.get(queries.legendToggleItem)
      .contains(values.vestigingenHoreca)
      .click()
    cy.get(queries.legendNotification)
      .scrollIntoView()
      .contains(values.legendPermissionNotification)
      .should('exist')
      .and('be.visible')
  })

  describe('7', () => {
    it('A. Should NOT allow a visitor to view "Vestigingen"', () => {
      cy.visit(urls.vestigingenTabel)
      cy.get(queries.warningPanel).contains('Medewerkers/ketenpartners van Gemeente Amsterdam')
      cy.get(DATA_SELECTION_TABLE.table).should('not.exist')
    })

    it('B. Should show a visitor limited "Pand" information', () => {
      cy.server()
      cy.route('/bag/pand/*').as('getResults')
      cy.route('/monumenten/monumenten/?betreft_pand=*').as('getMonumenten')
      cy.route('/bag/nummeraanduiding/?pand=*').as('getNummeraanduidingen')

      cy.visit(urls.pand)

      cy.wait('@getResults')
      cy.wait('@getMonumenten')
      cy.wait('@getNummeraanduidingen')
      cy.get(queries.headerTitle).contains('036310001')
      cy.get(queries.warningPanelAngular).contains(
        'Medewerkers/ketenpartners van Gemeente Amsterdam',
      )
      cy.get(queries.listItem)
        .contains(values.pandVestigingName)
        .should('not.exist')
    })

    it('C. Should show a visitor limited information in a Geo search', () => {
      cy.server()
      cy.defineGeoSearchRoutes()
      cy.route('/bag/pand/*').as('getResults')
      cy.route('/monumenten/monumenten/?betreft_pand=*').as('getMonumenten')
      cy.route('/bag/nummeraanduiding/?pand=*').as('getNummeraanduidingen')

      cy.visit(urls.geoSearch)

      cy.waitForGeoSearch()
      cy.wait('@getResults')
      cy.wait('@getMonumenten')
      cy.wait('@getNummeraanduidingen')
      cy.get('.o-header').contains('121437.46, 487418.76 (52.3736166, 4.8943521)')
      cy.get(queries.warningPanel).contains('Medewerkers/ketenpartners van Gemeente Amsterdam')
      cy.get(queries.headerSubTitle)
        .contains(values.vestigingen)
        .should('not.exist')
      // the map view maximize button should exist
      cy.get('button.icon-button__right')
      // click on the maximize button to open the map view
      cy.get('button.icon-button__right')
        .first()
        .click()
      cy.wait(250)
      cy.get(queries.mapSearchResultsCategoryHeader)
        .contains(values.vestigingen)
        .should('not.exist')
    })

    it('D. Should show a visitor limited information in a "ligplaats" search', () => {
      cy.server()
      cy.route('/bag/ligplaats/*').as('getResults')
      cy.route('/bag/nummeraanduiding/*').as('getNummeraanduiding')
      cy.route('/monumenten/situeringen/?betreft_nummeraanduiding=*').as('getMonument')

      cy.visit(urls.ligplaats)

      cy.wait('@getResults')
      cy.wait('@getNummeraanduiding')
      cy.wait('@getMonument')
      cy.get(queries.headerTitle).contains('Zwanenburgwal 44')
      cy.get(queries.warningPanelAngular).contains(
        'Medewerkers/ketenpartners van Gemeente Amsterdam',
      )
      cy.get(queries.listItem)
        .contains(values.ligplaatsVestigingName)
        .should('not.exist')
    })

    it('E. Should show a visitor limited information in "standplaats" search', () => {
      cy.server()
      cy.route('/bag/standplaats/*').as('getResults')
      cy.route('/bag/nummeraanduiding/*').as('getNummeraanduiding')
      cy.route('/monumenten/situeringen/?betreft_nummeraanduiding=*').as('getMonument')

      cy.visit(urls.standplaats)

      cy.wait('@getResults')
      cy.wait('@getNummeraanduiding')
      cy.get(queries.headerTitle).contains('Rollemanstraat 9')
      cy.get(queries.warningPanelAngular).contains(
        'Medewerkers/ketenpartners van Gemeente Amsterdam',
      )
      cy.get(queries.listItem)
        .contains(values.standplaatsVestigingName)
        .should('not.exist')
    })

    it('F. Should NOT allow a visitor to view "vestiging"', () => {
      cy.visit(urls.vestiging)
      cy.get(queries.headerTitle).should('not.exist')
      cy.get(queries.warningPanelAngular).contains(
        'Medewerkers/ketenpartners van Gemeente Amsterdam',
      )
      cy.get(queries.keyValueList).should('not.exist')
    })

    it('G. Should NOT allow a visitor to view "maatschappelijke activiteit"', () => {
      cy.visit(urls.maatschappelijkeActiviteit)
      cy.get(queries.headerTitle).should('not.exist')
      cy.get(queries.warningPanelAngular).contains(
        'Medewerkers/ketenpartners van Gemeente Amsterdam',
      )
      cy.get(queries.keyValueList).should('not.exist')
    })
  })

  it('8A. Should show a visitor limited information in "monument"', () => {
    cy.server()
    cy.route('/monumenten/monumenten/*').as('getMonument')
    cy.route('/monumenten/complexen/*').as('getComplex')
    cy.route('/monumenten/situeringen/?monument_id=*').as('getSitueringen')

    cy.visit(urls.monument)

    cy.wait('@getMonument')
    cy.wait('@getComplex')
    cy.wait('@getSitueringen')
    cy.get(queries.headerTitle).contains('Museumtuin met hekwerken en bouwfragmenten')
    cy.get(queries.warningPanelAngular).contains('Medewerkers/ketenpartners van Gemeente Amsterdam')
    cy.get(queries.keyValueList)
      .contains(values.redengevendeOmschrijving)
      .should('not.exist')
    // the map view maximize button should exist
    cy.get('button.icon-button__right')
    // click on the maximize button to open the map view
    cy.get('button.icon-button__right')
      .first()
      .click()
    cy.get(queries.mapDetailResultItem)
      .contains(values.type)
      .should('not.exist')
  })

  it('8B. Should show a visitor limited information in "monument complex"', () => {
    cy.server()
    cy.route('/monumenten/complexen/*').as('getComplex')
    cy.route('/monumenten/monumenten/?complex_id=*').as('getMonumenten')

    cy.visit(urls.monumentComplex)

    cy.wait('@getComplex')
    cy.wait('@getMonumenten')
    cy.get(queries.headerTitle).contains('Hortus Botanicus')
    cy.get(queries.warningPanelAngular).contains('Medewerkers/ketenpartners van Gemeente Amsterdam')
    cy.get(queries.keyValueList)
      .contains(values.beschrijving)
      .should('not.exist')
  })
})
