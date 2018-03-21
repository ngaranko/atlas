import { login, logout } from '../services/authentication';
import {URLS} from '../shared/urls';
import { PAGELOAD_WAIT, foundKadastraleSubjecten } from '../shared/helpers';

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
    cy.get('#global-search').focus().type('bakker');
    cy.get('.c-autocomplete__tip').should('exist').and('be.visible');
    cy.get('.qa-autocomplete-header').contains('Kadastrale subjecten');
    cy.get('.c-autocomplete__category__suggestion').contains('lia Bak');
  });

  it('1. Should show no message after search is performed', () => {
    cy.get('#global-search').focus().type('bakker');
    cy.get('.qa-search-form-submit').click();
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('.qa-search-header').contains('Kadastrale subjecten');
    if (foundKadastraleSubjecten.amount > 0) {
      cy.get('.qa-search-header').contains('Kadastrale subjecten').then((title) => {
        const tmpFoundKs = parseInt(title.text().match(/\(([1-9.,]*)\)/)[1].replace('.', ''));
        expect(tmpFoundKs).to.be.above(foundKadastraleSubjecten.amount);
      });
    } else {
      cy.log('foundKadastraleSubjecten.amount not filled, run the permissions-employee_spec before running this test')
    }
  });

  it('2A. Should allow a plus employee to view everything of natural subject', () => {
    cy.visit(URLS.natuurlijk);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('.o-header__title').contains('akke');
    cy.get('dl.qa-natuurlijk-persoon').should('exist').and('be.visible');
    cy.get('.qa-kadastraal-subject-recht').contains('Eigendom');
  });

  it('2B. Should allow a plus employee to view a non-natural subject', () => {
    cy.visit(URLS.nietNatuurlijk);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('.o-header__title').contains('ledo Ho');
    cy.get('dl.qa-niet-natuurlijk-persoon').should('exist').and('be.visible');
  });

  it('3. Should show a plus employee all info for a cadastral subject', () => {
    cy.visit(URLS.business);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('.o-header__title').contains('575 A');
    cy.get('.o-header__subtitle').contains('Aantekeningen');
  });

  it('4. Should show a plus employee all info for an address', () => {
    cy.visit(URLS.address);
    cy.wait(PAGELOAD_WAIT);
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
    cy.visit(URLS.gemeentelijkeBeperking);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('.o-header__title').contains('6142');
    cy.get('.c-key-value-list').contains('Documentnaam');
  });

  it('6. Should show a plus employee all map layers', () => {
    cy.visit(URLS.map);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.map-layers__category').should(($values) => {
      expect($values).to.contain('Economie en haven');
      expect($values).to.contain('Geografie');
      expect($values).to.contain('Bedrijven - Invloedsgebieden');
    });
  });

  it('7A. Should allow a plus employee to view "Vestigingen"', () => {
    cy.visit(URLS.vestigingenTabel);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('.c-table').contains('Handelsnaam');
  });

  it('7B. Should show a plus employee all "Pand" information', () => {
    cy.visit(URLS.pand);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.o-header__title').contains('100012');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('li').should(($values) => {
      expect($values).to.contain('llan');
    });
  });

  it('7C. Should show a plus employee all information in a Geo search', () => {
    cy.visit(URLS.geoSearch);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.o-header').contains('121393.70, 4873');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('h2').should(($values) => {
      expect($values).to.contain('Vestigingen');
    });
    cy.get('button.toggle-fullscreen').click();
    cy.wait(PAGELOAD_WAIT);
    cy.screenshot();
    cy.get('.map-search-results-category__header').should(($values) => {
      expect($values).to.contain('Vestigingen');
    });
  });

  it('7D. Should show a plus employee all information in a "ligplaats" search', () => {
    cy.visit(URLS.ligplaats);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.o-header__title').contains('terdo');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('li').should(($values) => {
      expect($values).to.contain('ace Am');
    });
  });

  it('7E. Should show a plus employee all information in "standplaats" search', () => {
    cy.visit(URLS.standplaats);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.o-header__title').contains('eletst');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('li').should(($values) => {
      expect($values).to.contain('tru');
    });
  });

  it('7F. Should allow a plus employee to view "vestiging"', () => {
    cy.visit(URLS.vestiging);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.o-header__title').contains('oierss')
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('dl.c-key-value-list dd').should(($values) => {
      expect($values).to.contain('vom');
    });

    cy.get('button.toggle-fullscreen').click();
    cy.get('.notification--info').should('not.exist');
    cy.get('.map-detail-result__header-subtitle').contains('vom')
  });

  it('7G. Should allow a plus employee to view "maatschappelijke activiteit"', () => {
    cy.visit(URLS.vestiging);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.o-header__title').contains('ooiers')
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('dl.c-key-value-list dd').should(($values) => {
      expect($values).to.contain('vom');
    });
  });


  it('8. Should show a plus employee all information in "monument"', () => {
    cy.visit(URLS.monument);
    cy.wait(PAGELOAD_WAIT);
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
    cy.visit(URLS.monumentComplex);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.o-header__title').contains('us Bot');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('dl.c-key-value-list dt').should(($values) => {
      expect($values).to.contain('Beschrijving');
    });
  });
});
