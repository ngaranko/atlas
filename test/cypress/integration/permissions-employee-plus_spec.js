import { login, logout } from '../services/authentication';
import URLS from '../shared/urls';
import foundKadastraleSubjecten from '../shared/helpers';
import {
  defineGeoSearchRoutes,
  defineSearchRoutes,
  waitForGeoSearch,
  waitForSearch
} from '../services/routing';

describe('employee PLUS permissions', () => {
  before(() => {
    login('EMPLOYEE_PLUS');
  });

  beforeEach(() => {
    // go to the homepage
    cy.visit('/');
  });

  after(() => {
    logout();
    foundKadastraleSubjecten.amount = 0;
  });

  it('0. Should show "Kadastrale subjecten" for medewerker plus in the autocomplete', () => {
    cy.server();
    cy.route('/typeahead?q=bakker').as('getResults');

    cy.get('#global-search').focus().type('bakker');

    cy.wait('@getResults');
    cy.get('.c-autocomplete__tip').should('exist').and('be.visible');
    cy.get('.qa-autocomplete-header').contains('Kadastrale subjecten');
    cy.get('.c-autocomplete__category__suggestion').contains('lia Bak');
  });

  it('1. Should show no message after search is performed', () => {
    cy.server();
    defineSearchRoutes();

    cy.get('#global-search').focus().type('bakker');
    cy.get('.qa-search-form-submit').click();

    waitForSearch();
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('.qa-search-header').contains('Kadastrale subjecten');
    if (foundKadastraleSubjecten.amount > 0) {
      cy.get('.qa-search-header').contains('Kadastrale subjecten').then((title) => {
        const tmpFoundKs = parseInt(title.text().match(/\(([1-9.,]*)\)/)[1].replace('.', ''), 10);
        expect(tmpFoundKs).to.be.above(foundKadastraleSubjecten.amount);
      });
    } else {
      cy.log('foundKadastraleSubjecten.amount not filled, run the permissions-employee_spec before running this test');
    }
  });

  it('2A. Should allow a plus employee to view everything of natural subject', () => {
    cy.server();
    cy.route('/brk/subject/*').as('getResults');
    cy.route('/brk/zakelijk-recht/?kadastraal_subject=*').as('getZakelijkeRechten');

    cy.visit(URLS.natuurlijk);

    cy.wait('@getResults');
    cy.wait('@getZakelijkeRechten');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('.o-header__title').contains('akke');
    cy.get('dl.qa-natuurlijk-persoon').should('exist').and('be.visible');
    cy.get('.qa-kadastraal-subject-recht').contains('Eigendom');
  });

  it('2B. Should allow a plus employee to view a non-natural subject', () => {
    cy.server();
    cy.route('/brk/subject/*').as('getResults');
    cy.route('/brk/zakelijk-recht/?kadastraal_subject=*').as('getZakelijkeRechten');

    cy.visit(URLS.nietNatuurlijk);

    cy.wait('@getResults');
    cy.wait('@getZakelijkeRechten');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('.o-header__title').contains('ledo Ho');
    cy.get('dl.qa-niet-natuurlijk-persoon').should('exist').and('be.visible');
    cy.get('.qa-kadastraal-subject-recht').contains('Eigendom');
  });

  it('3. Should show a plus employee all info for a cadastral subject', () => {
    cy.server();
    cy.route('/brk/object/*').as('getResults');
    cy.route('/brk/object-expand/*').as('getObjectExpand');
    cy.route('/bag/nummeraanduiding/?kadastraalobject=*').as('getNummeraanduidingen');

    cy.visit(URLS.business);

    cy.wait('@getResults');
    cy.wait('@getObjectExpand');
    cy.wait('@getNummeraanduidingen');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('.o-header__title').contains('575 A');
    cy.get('.o-header__subtitle').contains('Aantekeningen');
  });

  it('4. Should show a plus employee all info for an address', () => {
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

  it('5. Should show a plus employee all info for "Gemeentelijke beperking"', () => {
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

  it('6. Should show a plus employee all map layers', () => {
    cy.visit(URLS.map);
    cy.get('.map-layers__category').should(($values) => {
      expect($values).to.contain('Economie en haven');
      expect($values).to.contain('Geografie');
      expect($values).to.contain('Bedrijven - Invloedsgebieden');
    });
  });

  it('7A. Should allow a plus employee to view "Vestigingen"', () => {
    cy.server();
    cy.route('/dataselectie/hr/*').as('getResults');

    cy.visit(URLS.vestigingenTabel);

    cy.wait('@getResults');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('.c-table').contains('Handelsnaam');
  });

  it('7B. Should show a plus employee all "Pand" information', () => {
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
    cy.get('.o-header__title').contains('100012');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('li').should(($values) => {
      expect($values).to.contain('llan');
    });
  });

  it('7C. Should show a plus employee all information in a Geo search', () => {
    cy.server();
    defineGeoSearchRoutes();
    cy.route('/bag/pand/*').as('getResults');
    cy.route('/monumenten/monumenten/?betreft_pand=*').as('getMonumenten');
    cy.route('/bag/nummeraanduiding/?pand=*').as('getNummeraanduidingen');
    cy.route('/handelsregister/vestiging/?pand=*').as('getVestigingen');

    cy.visit(URLS.geoSearch);

    waitForGeoSearch();
    cy.wait('@getResults');
    cy.wait('@getMonumenten');
    cy.wait('@getNummeraanduidingen');
    cy.wait('@getVestigingen');
    cy.get('.o-header').contains('121393.70, 4873');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('h2').should(($values) => {
      expect($values).to.contain('Vestigingen');
    });
    cy.get('button.toggle-fullscreen').click();
    cy.get('.map-search-results-category__header').should(($values) => {
      expect($values).to.contain('Vestigingen');
    });
  });

  it('7D. Should show a plus employee all information in a "ligplaats" search', () => {
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
    cy.get('.o-header__title').contains('terdo');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('li').should(($values) => {
      expect($values).to.contain('ace Am');
    });
  });

  it('7E. Should show a plus employee all information in "standplaats" search', () => {
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
    cy.get('.o-header__title').contains('eletst');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('li').should(($values) => {
      expect($values).to.contain('tru');
    });
  });

  it('7F. Should allow a plus employee to view "vestiging"', () => {
    cy.server();
    cy.route('/handelsregister/vestiging/*').as('getVestiging');
    cy.route('/handelsregister/maatschappelijkeactiviteit/*').as('getMaatschappelijkeActiviteit');

    cy.visit(URLS.vestiging);

    cy.wait('@getVestiging');
    cy.wait('@getMaatschappelijkeActiviteit');
    cy.get('.o-header__title').contains('oierss');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('dl.c-key-value-list dd').should(($values) => {
      expect($values).to.contain('vom');
    });

    cy.get('button.toggle-fullscreen').click();
    cy.get('.notification--info').should('not.exist');
    cy.get('.map-detail-result__header-subtitle').contains('vom');
  });

  it('7G. Should allow a plus employee to view "maatschappelijke activiteit"', () => {
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
    cy.get('.o-header__title').contains('om B.');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('dl.c-key-value-list dd').should(($values) => {
      expect($values).to.contain('vom');
    });
  });


  it('8A. Should show a plus employee all information in "monument"', () => {
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

  it('8B. Should show a plus employee all information in "monument complex"', () => {
    cy.server();
    cy.route('/monumenten/complexen/*').as('getComplex');
    cy.route('/monumenten/monumenten/?complex_id=*').as('getMonumenten');

    cy.visit(URLS.monumentComplex);

    cy.wait('@getComplex');
    cy.wait('@getMonumenten');
    cy.get('.o-header__title').contains('us Bot');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('dl.c-key-value-list dt').should(($values) => {
      expect($values).to.contain('Beschrijving');
    });
  });
});
