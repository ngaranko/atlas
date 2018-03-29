import { login, logout } from '../services/authentication';
import URLS from '../shared/urls';
import { PAGELOAD_WAIT, foundKadastraleSubjecten } from '../shared/helpers';

describe('employee permissions', () => {
  before(() => {
    login('EMPLOYEE');
  });

  beforeEach(() => {
    // go to the homepage
    cy.visit('/');
  });

  after(() => {
    logout();
  });

  it('0. Should show "Kadastrale subjecten" for medewerker in the auto-suggest', () => {
    cy.get('#global-search').focus().type('bakker');
    cy.get('.c-auto-suggest__tip').should('exist').and('be.visible');
    cy.get('.qa-auto-suggest-header').contains('Kadastrale subjecten');
    cy.get('.c-auto-suggest__category__suggestion').contains('ijf Ja');
  });

  it('1. Should show a message after search is performed', () => {
    cy.server();
    cy.route('https://acc.api.data.amsterdam.nl/meetbouten/search/?q=*').as('getMeetboutenResults');
    cy.route('https://acc.api.data.amsterdam.nl/monumenten/search/?q=*').as('getMonumentenResults');

    cy.get('#global-search').focus().type('bakker');
    cy.get('.qa-search-form-submit').click();

    cy.wait('@getMeetboutenResults');
    cy.wait('@getMonumentenResults');

    cy.get('.c-panel--warning')
      .contains('Medewerkers met speciale bevoegdheden kunnen alle gegevens vinden');
    cy.get('.qa-search-header').contains('Kadastrale subjecten');
    cy.get('.qa-search-header').contains('Kadastrale subjecten').then((title) => {
      foundKadastraleSubjecten.amount = parseInt(
        title.text().match(/\(([1-9.,]*)\)/)[1].replace('.', ''), 10
      );
    });
  });

  it('2A. Should allow an employee to view a natural person but not the "Zakelijke rechten"', () => {
    cy.visit(URLS.natuurlijk);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.c-panel--warning')
      .contains('Medewerkers met speciale bevoegdheden kunnen alle gegevens zien (ook zakelijke rechten).');
    cy.get('.o-header__title').contains('akker');
    cy.get('dl.qa-natuurlijk-persoon').should('exist').and('be.visible');
  });

  it('2B. Should allow an employee to view a non-natural subject', () => {
    cy.visit(URLS.nietNatuurlijk);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('.o-header__title').contains('er & T');
    cy.get('dl.qa-niet-natuurlijk-persoon').should('exist').and('be.visible');
  });

  it('3. Should show an employee all info for a cadastral subject', () => {
    cy.visit(URLS.business);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('.o-header__title').contains('08575');
    cy.get('.o-header__subtitle').contains('Aantekeningen');
  });

  it('4. Should show an employee all info for an address', () => {
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

  it('5. Should show an employee all info for "Gemeentelijke beperking"', () => {
    cy.visit(URLS.gemeentelijkeBeperking);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('.o-header__title').contains('6142');
    cy.get('.c-key-value-list').contains('Documentnaam');
  });

  it('6. Should show an employee all map layers', () => {
    cy.visit(URLS.map);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.map-layers__category').should(($values) => {
      expect($values).to.contain('Economie en haven');
      expect($values).to.contain('Geografie');
      expect($values).to.contain('Bedrijven - Invloedsgebieden');
    });
  });

  it('7A. Should allow an employee to view "Vestigingen"', () => {
    cy.visit(URLS.vestigingenTabel);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('.c-table').contains('Handelsnaam');
  });

  it('7B. Should show an employee all "Pand" information', () => {
    cy.visit(URLS.pand);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.o-header__title').contains('0001216');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('li').should(($values) => {
      expect($values).to.contain('aller');
    });
  });

  it('7C. Should show an employee all information in a Geo search', () => {
    cy.visit(URLS.geoSearch);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.o-header').contains('1393.70, 48738');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('h2').should(($values) => {
      expect($values).to.contain('Vestigingen');
    });
    cy.get('button.toggle-fullscreen').click();
    cy.wait(PAGELOAD_WAIT);
    cy.get('.map-search-results-category__header').should(($values) => {
      expect($values).to.contain('Vestigingen');
    });
  });

  it('7D. Should show an employee all information in a "ligplaats" search', () => {
    cy.visit(URLS.ligplaats);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.o-header__title').contains('Oosterdokskade 8');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('li').should(($values) => {
      expect($values).to.contain('lace Ams');
    });
  });

  it('7E. Should show an employee all information in "standplaats" search', () => {
    cy.visit(URLS.standplaats);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.o-header__title').contains('oedele');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('li').should(($values) => {
      expect($values).to.contain('us Be');
    });
  });

  it('7F. Should allow an employee to view "vestiging"', () => {
    cy.visit(URLS.vestiging);
    cy.wait(PAGELOAD_WAIT);
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
    cy.visit(URLS.vestiging);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.o-header__title').contains('vom B.');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('dl.c-key-value-list dd').should(($values) => {
      expect($values).to.contain('vom B');
    });
  });

  it('8. Should show an employee all information in "monument"', () => {
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

  it('8B. Should show an employee all information in "monument complex"', () => {
    cy.visit(URLS.monumentComplex);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.o-header__title').contains('us Bo');
    cy.get('.c-panel--warning').should('not.exist');
    cy.get('dl.c-key-value-list dt').should(($values) => {
      expect($values).to.contain('Beschrijving');
    });
  });
});
