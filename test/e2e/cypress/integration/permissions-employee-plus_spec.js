import { getCountFromHeader } from '../support/helper-functions'
import { queries, urls, values } from '../support/permissions-constants'
import { DATA_SELECTION_TABLE } from '../support/selectors'

describe('employee PLUS permissions', () => {
  before(() => {
    cy.login('EMPLOYEE_PLUS')
  })

  after(() => {
    cy.logout()
  })

  it('0. Should show "Kadastrale subjecten" for medewerker plus in the autocomplete', () => {
    cy.server()
    cy.route('/typeahead?q=bakker').as('getResults')

    cy.visit('/')

    cy.get('#auto-suggest__input')
      .focus()
      .type('bakker')

    cy.wait('@getResults')
    cy.get('.auto-suggest__dropdown')
      .get('h4')
      .invoke('width')
      .should('be.gt', 0)
    cy.get('.auto-suggest__tip')
      .should('exist')
      .and('be.visible')
    cy.get('.auto-suggest__dropdown').contains(values.kadastraleSubjecten)
    cy.get('.auto-suggest__dropdown-item').contains('lia Bak')
  })

  it('1. Should show no message after search is performed', () => {
    cy.server()
    cy.defineSearchRoutes()

    cy.visit('/')

    cy.get('#auto-suggest__input')
      .focus()
      .type('bakker{enter}')

    cy.waitForSearch()
    cy.get(queries.warningPanel).should('not.exist')
    cy.get(queries.searchHeader)
      .contains(values.kadastraleSubjecten)
      .then(title => {
        const count = getCountFromHeader(title.text())
        expect(count).to.be.above(100)
      })
  })

  it('2A. Should allow a plus employee to view everything of natural subject', () => {
    cy.server()
    cy.route('/brk/subject/*').as('getResults')
    cy.route('/brk/zakelijk-recht/?kadastraal_subject=*').as('getZakelijkeRechten')

    cy.visit(urls.natuurlijk)

    cy.wait('@getResults')
    cy.wait('@getZakelijkeRechten')
    cy.get(queries.warningPanel).should('not.exist')
    cy.get(queries.headerTitle).contains('akke')
    cy.get(queries.natuurlijkPersoon)
      .should('exist')
      .and('be.visible')
    cy.get('.qa-kadastraal-subject-recht').contains('Eigendom')
  })

  it('2B. Should allow a plus employee to view a non-natural subject', () => {
    cy.server()
    cy.route('/brk/subject/*').as('getResults')
    cy.route('/brk/zakelijk-recht/?kadastraal_subject=*').as('getZakelijkeRechten')

    cy.visit(urls.nietNatuurlijk)

    cy.wait('@getResults')
    cy.wait('@getZakelijkeRechten')
    cy.get(queries.warningPanel).should('not.exist')
    cy.get(queries.headerTitle).contains('ledo Ho')
    cy.get(queries.nietNatuurlijkPersoon)
      .should('exist')
      .and('be.visible')
    cy.get('.qa-kadastraal-subject-recht').contains('Eigendom')
  })

  it('3. Should show a plus employee all info for a cadastral subject', () => {
    cy.server()
    cy.route('/brk/object/*').as('getResults')
    cy.route('/brk/object-expand/*').as('getObjectExpand')
    cy.route('/bag/nummeraanduiding/?kadastraalobject=*').as('getNummeraanduidingen')

    cy.visit(urls.business)

    cy.wait('@getResults')
    cy.wait('@getObjectExpand')
    cy.wait('@getNummeraanduidingen')
    cy.get(queries.warningPanel).should('not.exist')
    cy.get(queries.headerTitle).contains('575 A')
    cy.get(queries.headerSubTitle).contains(values.aantekeningen)
  })

  it('4. Should show a plus employee all info for an address', () => {
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
    cy.get(queries.headerTitle).contains('Nes 98')
    cy.get(queries.headerSubTitle).should($values => {
      expect($values).to.contain('Ligt in')
      expect($values).to.contain('Panoramabeeld')
      expect($values).to.contain('Verblijfsobject')
      expect($values).to.contain('Panden')
      expect($values).to.contain('Vestigingen')
      expect($values).to.contain('Kadastrale objecten')
      expect($values).to.contain('Monumenten')
      expect($values).to.contain(values.zakelijkeRechten)
    })
    cy.get(queries.warningPanel).should('not.exist')
  })

  it('5. Should show a plus employee all info for "Gemeentelijke beperking"', () => {
    cy.server()
    cy.route('/wkpb/beperking/*').as('getResults')
    cy.route('/wkpb/brondocument/?beperking=*').as('getBronDocument')
    cy.route('/brk/object/?beperkingen__id=*').as('getObject')

    cy.visit(urls.gemeentelijkeBeperking)

    cy.wait('@getResults')
    cy.wait('@getBronDocument')
    cy.wait('@getObject')
    cy.get(queries.warningPanel).should('not.exist')
    cy.get(queries.headerTitle).contains('6142')
    cy.get(queries.keyValueList).contains(values.documentnaam)
  })

  it.skip('6. Should allow a plus employee to view all map layers', () => {
    cy.visit(urls.map)
    cy.get(queries.mapLayersCategory).should($values => {
      expect($values).to.contain(values.economieEnHaven)
      expect($values).to.contain(values.geografie)
      expect($values).to.contain(values.bedrijvenInvloedsgebieden)
    })
    cy.get(queries.legendToggleItem)
      .contains(values.vestigingenHoreca)
      .click()
    cy.get(queries.legendNotification).should('not.exist')
    // DP-6654 fix this on Chrome
    // cy.get(queries.legendItem).contains(values.legendCafeValue).should('exist')
    //    .and('be.visible');
  })

  it('7A. Should allow a plus employee to view "Vestigingen"', () => {
    cy.server()
    cy.route('/dataselectie/hr/*').as('getResults')

    cy.visit(urls.vestigingenTabel)

    cy.wait('@getResults')
    cy.get(queries.warningPanel).should('not.exist')
    cy.get(DATA_SELECTION_TABLE.table).contains('Handelsnaam')
  })

  it('7B. Should show a plus employee all "Pand" information', () => {
    cy.server()
    cy.route('/bag/pand/*').as('getResults')
    cy.route('/monumenten/monumenten/?betreft_pand=*').as('getMonumenten')
    cy.route('/bag/nummeraanduiding/?pand=*').as('getNummeraanduidingen')
    cy.route('/handelsregister/vestiging/?pand=*').as('getVestigingen')

    cy.visit(urls.pand)

    cy.wait('@getResults')
    cy.wait('@getMonumenten')
    cy.wait('@getNummeraanduidingen')
    cy.wait('@getVestigingen')
    cy.get(queries.headerTitle).contains('100012')
    cy.get(queries.warningPanel).should('not.exist')
    cy.get(queries.listItem).contains(values.pandVestigingName)
  })

  it('7C. Should show a plus employee all information in a Geo search', () => {
    cy.server()
    cy.defineGeoSearchRoutes()
    cy.route('/bag/pand/*').as('getResults')
    cy.route('/monumenten/monumenten/?betreft_pand=*').as('getMonumenten')
    cy.route('/bag/nummeraanduiding/?pand=*').as('getNummeraanduidingen')
    cy.route('/handelsregister/vestiging/?pand=*').as('getVestigingen')
    cy.route('/panorama/thumbnail/*').as('getPanorama')

    cy.visit(urls.geoSearch)

    cy.waitForGeoSearch()
    cy.wait('@getResults')
    cy.wait('@getMonumenten')
    cy.wait('@getNummeraanduidingen')
    cy.wait('@getVestigingen')
    cy.wait('@getPanorama')
    cy.get('.qa-search-header').contains('121437.46')
    cy.get(queries.warningPanel).should('not.exist')
    cy.get(queries.headerSubTitle).contains(values.vestigingen)

    cy.get('.qa-toggle-fullscreen').click()
    cy.waitForGeoSearch()
    cy.wait('@getMonumenten')
    cy.wait('@getNummeraanduidingen')
    cy.wait('@getVestigingen')
    cy.wait('@getPanorama')
    cy.get(queries.mapSearchResultsCategoryHeader).contains(values.vestigingen)
  })

  it('7D. Should show a plus employee all information in a "ligplaats" search', () => {
    cy.server()
    cy.route('/bag/ligplaats/*').as('getResults')
    cy.route('/bag/nummeraanduiding/*').as('getNummeraanduiding')
    cy.route('/monumenten/situeringen/?betreft_nummeraanduiding=*').as('getMonument')
    cy.route('/handelsregister/vestiging/?nummeraanduiding=*').as('getVestigingen')

    cy.visit(urls.ligplaats)

    cy.wait('@getResults')
    cy.wait('@getNummeraanduiding')
    cy.wait('@getMonument')
    cy.wait('@getVestigingen')
    cy.get(queries.headerTitle).contains('terdo')
    cy.get(queries.warningPanel).should('not.exist')
    cy.get(queries.listItem).contains(values.ligplaatsVestigingName)
  })

  it('7E. Should show a plus employee all information in "standplaats" search', () => {
    cy.server()
    cy.route('/bag/standplaats/*').as('getResults')
    cy.route('/bag/nummeraanduiding/*').as('getNummeraanduiding')
    cy.route('/monumenten/situeringen/?betreft_nummeraanduiding=*').as('getMonument')
    cy.route('/handelsregister/vestiging/?nummeraanduiding=*').as('getVestigingen')

    cy.visit(urls.standplaats)

    cy.wait('@getResults')
    cy.wait('@getNummeraanduiding')
    cy.wait('@getMonument')
    cy.wait('@getVestigingen')
    cy.get(queries.headerTitle).contains('eletst')
    cy.get(queries.warningPanel).should('not.exist')
    cy.get(queries.listItem).contains(values.standplaatsVestigingName)
  })

  it('7F. Should allow a plus employee to view "vestiging"', () => {
    cy.server()
    cy.route('/handelsregister/vestiging/*').as('getVestiging')
    cy.route('/handelsregister/maatschappelijkeactiviteit/*').as('getMaatschappelijkeActiviteit')

    cy.visit(urls.vestiging)

    cy.wait(500)
    cy.wait('@getVestiging')
    cy.wait('@getMaatschappelijkeActiviteit')
    cy.get(queries.headerTitle).contains('oierss')
    cy.get(queries.warningPanel).should('not.exist')
    cy.get(queries.keyValueList).contains(values.vestigingName)

    cy.get('.qa-toggle-fullscreen').click()
    cy.get(queries.infoNotification).should('not.exist')
    cy.get(queries.mapDetailResultHeaderSubTitle).contains(values.vestigingName)
  })

  it('7G. Should allow a plus employee to view "maatschappelijke activiteit"', () => {
    cy.server()
    cy.route('/handelsregister/maatschappelijkeactiviteit/*').as('getMaatschappelijkeActiviteit')
    cy.route('/handelsregister/persoon/*').as('getPersoon')
    cy.route('/handelsregister/vestiging/?maatschappelijke_activiteit=*').as('getVestigingen')
    cy.route('/handelsregister/functievervulling/?heeft_aansprakelijke=*').as(
      'getFunctievervullingen',
    )

    cy.visit(urls.maatschappelijkeActiviteit)

    cy.wait('@getMaatschappelijkeActiviteit')
    cy.wait('@getPersoon')
    cy.wait('@getVestigingen')
    cy.wait('@getFunctievervullingen')
    cy.get(queries.headerTitle).contains(values.maatschappelijkeActiviteitName)
    cy.get(queries.warningPanel).should('not.exist')
    cy.get(queries.keyValueList).contains(values.maatschappelijkeActiviteitVestigingName)
  })

  it('8A. Should show a plus employee all information in "monument"', () => {
    cy.server()
    cy.route('/monumenten/monumenten/*').as('getMonument')
    cy.route('/monumenten/complexen/*').as('getComplex')
    cy.route('/monumenten/situeringen/?monument_id=*').as('getSitueringen')

    cy.visit(urls.monument)

    cy.wait('@getMonument')
    cy.wait('@getComplex')
    cy.wait('@getSitueringen')
    cy.get(queries.headerTitle).contains('Museumtuin met hekwerken en bouwfragmenten')
    cy.get(queries.warningPanel).should('not.exist')
    cy.get(queries.keyValueList).contains(values.redengevendeOmschrijving)
    cy.get('.qa-toggle-fullscreen').click()
    cy.get(queries.mapDetailResultItem).contains(values.type)
  })

  it('8B. Should show a plus employee all information in "monument complex"', () => {
    cy.server()
    cy.route('/monumenten/complexen/*').as('getComplex')
    cy.route('/monumenten/monumenten/?complex_id=*').as('getMonumenten')

    cy.visit(urls.monumentComplex)

    cy.wait('@getComplex')
    cy.wait('@getMonumenten')
    cy.get(queries.headerTitle).contains('us Bot')
    cy.get(queries.warningPanel).should('not.exist')
    cy.get(queries.keyValueList).contains(values.beschrijving)
  })
})
