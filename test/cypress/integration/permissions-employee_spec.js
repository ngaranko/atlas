import { getCountFromHeader } from '../support/helper-functions';
import URLS from '../shared/urls';

describe('employee permissions', () => {
  before(() => {
    cy.login('EMPLOYEE');
  });

  beforeEach(() => {
    // go to the homepage
    cy.visit('/');
  });

  after(() => {
    cy.logout();
  });

  it('0. Should show "Kadastrale subjecten" for medewerker in the autocomplete', () => {
    cy.server();
    cy.route('/typeahead?q=bakker').as('getResults');

    cy.get('#global-search').focus().type('bakker');

    cy.wait('@getResults');
    cy.get('.c-autocomplete__tip').should('exist').and('be.visible');
    cy.get('.qa-autocomplete-header').contains('Kadastrale subjecten');
    cy.get('.c-autocomplete__category__suggestion').contains('ijf Ja');
  });

  it('1. Should show a message after search is performed', () => {
    cy.server();
    cy.defineSearchRoutes();

    cy.get('#global-search').focus().type('bakker');
    cy.get('.qa-search-form-submit').click();

    cy.waitForSearch();
    cy.get('.c-panel--warning')
      .contains('Medewerkers met speciale bevoegdheden kunnen alle gegevens vinden');
    cy.get('.qa-search-header').contains('Kadastrale subjecten').then((title) => {
      const count = getCountFromHeader(title.text());
      expect(count).to.be.below(100);
    });
  });

  it('2A. Should allow an employee to view a natural person but not the "Zakelijke rechten"', () => {
    cy.server();
    cy.route('/brk/subject/*').as('getResults');

    cy.visit(URLS.natuurlijk);

    cy.wait('@getResults');
    cy.get('.c-panel--warning')
      .contains('Medewerkers met speciale bevoegdheden kunnen alle gegevens zien (ook zakelijke rechten).');
    cy.get('.o-header__title').contains('akker');
    cy.get('dl.qa-natuurlijk-persoon').should('exist').and('be.visible');
  });

  it('2B. Should allow an employee to view a non-natural subject', () => {
    cy.server();
    cy.route('/brk/subject/*').as('getResults');

    cy.visit(URLS.nietNatuurlijk);

    cy.wait('@getResults');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('.o-header__title').contains('er & T');
    cy.get('dl.qa-niet-natuurlijk-persoon').should('exist').and('be.visible');
  });

  it('3. Should show an employee all info for a cadastral subject', () => {
    cy.server();
    cy.route('/brk/object/*').as('getResults');
    cy.route('/brk/object-expand/*').as('getObjectExpand');
    cy.route('/bag/nummeraanduiding/?kadastraalobject=*').as('getNummeraanduidingen');

    cy.visit(URLS.business);

    cy.wait('@getResults');
    cy.wait('@getObjectExpand');
    cy.wait('@getNummeraanduidingen');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('.o-header__title').contains('08575');
    cy.get('.o-header__subtitle').contains('Aantekeningen');
  });

  it('4. Should show an employee all info for an address', () => {
    cy.server();
    cy.route('/bag/verblijfsobject/*').as('getResults');

    cy.visit(URLS.address);

    cy.wait('@getResults');
    cy.get('.o-header__title').contains('Nes 98');
    cy.get('.o-header__subtitle').should(($values) => {
      expect($values).to.contain('Ligt in');
      expect($values).to.contain('Panoramabeeld');
      expect($values).to.contain('Verblijfsobject');
      expect($values).to.contain('Panden');
      expect($values).to.contain('Vestigingen');
      expect($values).to.contain('Kadastrale objecten');
      expect($values).to.contain('Monumenten');
    });
    cy.get('h3').should(($values) => {
      expect($values).to.contain('Zakelijke rechten');
    });
    cy.get('.c-panel--warning').should('not.exist');
  });

  it('5. Should show an employee all info for "Gemeentelijke beperking"', () => {
    cy.server();
    cy.route('/wkpb/beperking/*').as('getResults');
    cy.route('/wkpb/brondocument/?beperking=*').as('getBronDocument');
    cy.route('/brk/object/?beperkingen__id=*').as('getObject');

    cy.visit(URLS.gemeentelijkeBeperking);

    cy.wait('@getResults');
    cy.wait('@getBronDocument');
    cy.wait('@getObject');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('.o-header__title').contains('6142');
    cy.get('.c-key-value-list').contains('Documentnaam');
  });

  it('6. Should show an employee all map layers', () => {
    cy.visit(URLS.map);
    cy.get('.map-layers__category').should(($values) => {
      expect($values).to.contain('Economie en haven');
      expect($values).to.contain('Geografie');
      expect($values).to.contain('Bedrijven - Invloedsgebieden');
    });
  });

  it('7A. Should allow an employee to view "Vestigingen"', () => {
    cy.server();
    cy.route('/dataselectie/hr/*').as('getResults');

    cy.visit(URLS.vestigingenTabel);

    cy.wait('@getResults');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('.c-table').contains('Handelsnaam');
  });

  it('7B. Should show an employee all "Pand" information', () => {
    cy.server();
    cy.route('/bag/pand/*').as('getResults');
    cy.route('/monumenten/monumenten/?betreft_pand=*').as('getMonumenten');
    cy.route('/bag/nummeraanduiding/?pand=*').as('getNummeraanduidingen');
    cy.route('/handelsregister/vestiging/?pand=*').as('getVestigingen');

    cy.visit(URLS.pand);

    cy.wait('@getResults');
    cy.wait('@getMonumenten');
    cy.wait('@getNummeraanduidingen');
    cy.wait('@getVestigingen');
    cy.get('.o-header__title').contains('0001216');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('li').should(($values) => {
      expect($values).to.contain('aller');
    });
  });

  it('7C. Should show an employee all information in a Geo search', () => {
    cy.server();
    cy.defineGeoSearchRoutes();
    cy.route('/bag/pand/*').as('getResults');
    cy.route('/monumenten/monumenten/?betreft_pand=*').as('getMonumenten');
    cy.route('/bag/nummeraanduiding/?pand=*').as('getNummeraanduidingen');
    cy.route('/handelsregister/vestiging/?pand=*').as('getVestigingen');

    cy.visit(URLS.geoSearch);

    cy.waitForGeoSearch();
    cy.wait('@getResults');
    cy.wait('@getMonumenten');
    cy.wait('@getNummeraanduidingen');
    cy.wait('@getVestigingen');
    cy.get('.o-header').contains('1393.70, 48738');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('h2').should(($values) => {
      expect($values).to.contain('Vestigingen');
    });
    cy.get('button.toggle-fullscreen').click();
    cy.get('.map-search-results-category__header').should(($values) => {
      expect($values).to.contain('Vestigingen');
    });
  });

  it('7D. Should show an employee all information in a "ligplaats" search', () => {
    cy.server();
    cy.route('/bag/ligplaats/*').as('getResults');
    cy.route('/bag/nummeraanduiding/*').as('getNummeraanduiding');
    cy.route('/monumenten/situeringen/?betreft_nummeraanduiding=*').as('getMonument');
    cy.route('/handelsregister/vestiging/?nummeraanduiding=*').as('getVestigingen');

    cy.visit(URLS.ligplaats);

    cy.wait('@getResults');
    cy.wait('@getNummeraanduiding');
    cy.wait('@getMonument');
    cy.wait('@getVestigingen');
    cy.get('.o-header__title').contains('Oosterdokskade 8');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('li').should(($values) => {
      expect($values).to.contain('lace Ams');
    });
  });

  it('7E. Should show an employee all information in "standplaats" search', () => {
    cy.server();
    cy.route('/bag/standplaats/*').as('getResults');
    cy.route('/bag/nummeraanduiding/*').as('getNummeraanduiding');
    cy.route('/monumenten/situeringen/?betreft_nummeraanduiding=*').as('getMonument');
    cy.route('/handelsregister/vestiging/?nummeraanduiding=*').as('getVestigingen');

    cy.visit(URLS.standplaats);

    cy.wait('@getResults');
    cy.wait('@getNummeraanduiding');
    cy.wait('@getMonument');
    cy.wait('@getVestigingen');
    cy.get('.o-header__title').contains('oedele');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('li').should(($values) => {
      expect($values).to.contain('us Be');
    });
  });

  it('7F. Should allow an employee to view "vestiging"', () => {
    cy.server();
    cy.route('/handelsregister/vestiging/*').as('getVestiging');
    cy.route('/handelsregister/maatschappelijkeactiviteit/*').as('getMaatschappelijkeActiviteit');

    cy.visit(URLS.vestiging);

    cy.wait('@getVestiging');
    cy.wait('@getMaatschappelijkeActiviteit');
    cy.get('.o-header__title').contains('uwe Loo');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('dl.c-key-value-list dd').should(($values) => {
      expect($values).to.contain('vom ');
    });

    cy.get('button.toggle-fullscreen').click();
    cy.get('.notification--info').should('not.exist');
    cy.get('.map-detail-result__header-subtitle').contains('vom ');
  });

  it('7G. Should allow an employee to view "maatschappelijke activiteit"', () => {
    cy.server();
    cy.route('/handelsregister/maatschappelijkeactiviteit/*').as('getMaatschappelijkeActiviteit');
    cy.route('/handelsregister/persoon/*').as('getPersoon');
    cy.route('/handelsregister/vestiging/?maatschappelijke_activiteit=*').as('getVestigingen');
    cy.route('/handelsregister/functievervulling/?heeft_aansprakelijke=*').as('getFunctievervullingen');

    cy.visit(URLS.maatschappelijkeActiviteit);

    cy.wait('@getMaatschappelijkeActiviteit');
    cy.wait('@getPersoon');
    cy.wait('@getVestigingen');
    cy.wait('@getFunctievervullingen');
    cy.get('.o-header__title').contains('vom B.');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('dl.c-key-value-list dd').should(($values) => {
      expect($values).to.contain('vom B');
    });
  });

  it('8A. Should show an employee all information in "monument"', () => {
    cy.server();
    cy.route('/monumenten/monumenten/*').as('getMonument');
    cy.route('/monumenten/complexen/*').as('getComplex');
    cy.route('/monumenten/situeringen/?monument_id=*').as('getSitueringen');

    cy.visit(URLS.monument);

    cy.wait('@getMonument');
    cy.wait('@getComplex');
    cy.wait('@getSitueringen');
    cy.get('.o-header__title').contains('Museumtuin met hekwerken en bouwfragmenten');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('dl.c-key-value-list dt').should(($values) => {
      expect($values).to.contain('Redengevende omschrijving');
    });
    cy.get('button.toggle-fullscreen').click();
    cy.get('.map-detail-result__item').should(($values) => {
      expect($values).to.contain('Type');
    });
  });

  it('8B. Should show an employee all information in "monument complex"', () => {
    cy.server();
    cy.route('/monumenten/complexen/*').as('getComplex');
    cy.route('/monumenten/monumenten/?complex_id=*').as('getMonumenten');

    cy.visit(URLS.monumentComplex);

    cy.wait('@getComplex');
    cy.wait('@getMonumenten');
    cy.get('.o-header__title').contains('us Bo');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('dl.c-key-value-list dt').should(($values) => {
      expect($values).to.contain('Beschrijving');
    });
  });
});
