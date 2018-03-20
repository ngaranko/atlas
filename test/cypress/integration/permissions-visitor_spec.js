import { logout } from '../services/authentication';
import { URLS } from '../shared/urls';
import { PAGELOAD_WAIT } from '../shared/helpers';

describe('visitor permissions', () => {
  beforeEach(() => {
    // go to the homepage
    cy.visit('/');
    logout();
  });

  it('0. Should NOT show "Kadastrale subjecten" in the autocomplete', () => {
    cy.get('#global-search').focus().type('bakker');
    cy.get('.c-autocomplete__tip').should('exist').and('be.visible');
    cy.get('.qa-autocomplete-header').should(($values) => {
      expect($values).to.not.contain('Kadastrale subjecten')
    })
  });

  it('1. Should show a message after search is performed', () => {
    cy.get('#global-search').focus().type('bakker');
    cy.get('.qa-search-form-submit').click();
    cy.get('.c-panel--warning').contains('Meer resultaten na inloggen');
    cy.get('.qa-search-header').should(($values) => {
      expect($values).to.not.contain('Kadastrale subjecten')
    });
  });

  it('2A. Should not allow a visitor to view a natural subject', () => {
    cy.visit(URLS.natuurlijk);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.c-panel--warning')
      .contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('.o-header__title').should('not.exist');
    cy.get('dl.qa-natuurlijk-persoon').should('not.exist');

  });

  it('2B. Should not allow a visitor to view a non-natural subject', () => {
    cy.visit(URLS.nietNatuurlijk);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.c-panel--warning')
      .contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('.o-header__title').should('not.exist');
    cy.get('dl.qa-niet-natuurlijk-persoon').should('not.exist');
  });

  it('3. Should show a visitor limited info for a cadastral subject', () => {
    cy.visit(URLS.business);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.c-panel--warning')
      .contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('.o-header__title').contains('A 0001');
    cy.get('.o-header__subtitle').should(($values) => {
      expect($values).to.not.contain('Aantekeningen');
    });
  });

  it('4. Should show a visitor limited info for an address', () => {
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
      expect($values).to.not.contain('Zakelijke rechten');
    });
    cy.get('.c-panel--warning').contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
  });

  it('5. Should show a visitor limited info for "Gemeentelijke beperking"', () => {
    cy.visit(URLS.gemeentelijkeBeperking);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.c-panel--warning')
      .contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('.o-header__title').contains('142');
    cy.get('.c-key-value-list').should(($values) => {
      expect($values).to.not.contain('Documentnaam');
    });
  });

  it('6. Should show a visitor limited map layers', () => {
    cy.visit(URLS.map);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.map-layers__category').should(($values) => {
      expect($values).to.contain('Geografie');
      expect($values).to.not.contain('Bedrijven - Invloedsgebieden');
    });
  });

  it('7A. Should not allow a visitor to view "Vestigingen"', () => {
    cy.visit(URLS.vestigingenTabel);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.c-panel--warning').contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('.c-table').should('not.exist');
  });

  it('7B. Should show a visitor limited "Pand" information', () => {
    cy.visit(URLS.pand);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.o-header__title').contains('036310001');
    cy.get('.c-panel--warning').contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('li').should(($values) => {
      expect($values).to.not.contain('aller');
    });
  });

  it('7C. Should show a visitor limited information in a Geo search', () => {
    cy.visit(URLS.geoSearch);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.o-header').contains('393.70, 487385.19');
    cy.get('.c-panel--warning').contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('h2').should(($values) => {
      expect($values).to.not.contain('Vestigingen');
    });
    cy.get('button.toggle-fullscreen').click();
    cy.get('h4.map-search-results-category__header').should(($values) => {
      expect($values).to.not.contain('Vestigingen');
    });
  });

  it('7D. Should show a visitor limited information in a "ligplaats" search', () => {
    cy.visit(URLS.ligplaats);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.o-header__title').contains('erdokska');
    cy.get('.c-panel--warning').contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('li').should(($values) => {
      expect($values).to.not.contain('alac');
    });
  });

  it('7E. Should show a visitor limited information in "standplaats" search', () => {
    cy.visit(URLS.standplaats);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.o-header__title').contains('Johan Broedeletstraat 20');
    cy.get('.c-panel--warning').contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('li').should(($values) => {
      expect($values).to.not.contain('us Bed');
    });
  });

  it('7F. Should not allow a visitor to view "vestiging"', () => {
    cy.visit(URLS.vestiging);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.o-header__title').should('not.exist');
    cy.get('.c-panel--warning').contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('dl.c-key-value-list').should('not.exist');
    cy.get('button.toggle-fullscreen').click();
    cy.get('.notification--info').contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('.map-detail-result__header-subtitle').should('not.exist')
  });

  it('7G. Should not allow a visitor to view "maatschappelijke activiteit"', () => {
    cy.visit(URLS.maatschappelijkeActiviteit);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.o-header__title').should('not.exist');
    cy.get('.c-panel--warning').contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('dl.c-key-value-list').should('not.exist');
  });

  it('8. Should show a visitor limited information in "monument"', () => {
    cy.visit(URLS.monument);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.o-header__title').contains('Museumtuin met hekwerken en bouwfragmenten');
    cy.get('.c-panel--warning').contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('dl.c-key-value-list dt').should(($values) => {
      expect($values).to.not.contain('Redengevende omschrijving');
    });
    cy.get('button.toggle-fullscreen').click();
    cy.get('.map-detail-result__item').should(($values) => {
      expect($values).to.not.contain('Type');
    });
  });

  it('8B. Should show a visitor limited information in "monument complex"', () => {
    cy.visit(URLS.monumentComplex);
    cy.wait(PAGELOAD_WAIT);
    cy.get('.o-header__title').contains('Hortus Botanicus');
    cy.get('.c-panel--warning').contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('dl.c-key-value-list dt').should(($values) => {
      expect($values).to.not.contain('Beschrijving');
    });
  });
});
