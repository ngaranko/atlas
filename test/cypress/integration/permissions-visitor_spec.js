import URLS from '../shared/urls';

describe('visitor permissions', () => {
  beforeEach(() => {
    // go to the homepage
    cy.visit('/');
    cy.logout();
  });

  it('0. Should NOT show "Kadastrale subjecten" in the autocomplete', () => {
    cy.server();
    cy.route('/typeahead?q=bakker').as('getResults');

    cy.get('#global-search').focus().type('bakker');

    cy.wait('@getResults');
    cy.get('.c-autocomplete__tip').should('exist').and('be.visible');
    cy.get('.qa-autocomplete-header').should(($values) => {
      expect($values).to.not.contain('Kadastrale subjecten');
    });
  });

  it('1. Should show a message after search is performed', () => {
    cy.server();
    cy.defineSearchRoutes();

    cy.get('#global-search').focus().type('bakker');
    cy.get('.qa-search-form-submit').click();

    cy.waitForSearch(false);
    cy.get('.c-panel--warning').contains('Meer resultaten na inloggen');
    cy.get('.qa-search-header').should(($values) => {
      expect($values).to.not.contain('Kadastrale subjecten');
    });
  });

  it('2A. Should not allow a visitor to view a natural subject', () => {
    cy.visit(URLS.natuurlijk);

    cy.get('.c-panel--warning')
      .contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('.o-header__title').should('not.exist');
    cy.get('dl.qa-natuurlijk-persoon').should('not.exist');
  });

  it('2B. Should not allow a visitor to view a non-natural subject', () => {
    cy.visit(URLS.nietNatuurlijk);

    cy.get('.c-panel--warning')
      .contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('.o-header__title').should('not.exist');
    cy.get('dl.qa-niet-natuurlijk-persoon').should('not.exist');
  });

  it('3. Should show a visitor limited info for a cadastral subject', () => {
    cy.server();
    cy.route('/brk/object/*').as('getResults');
    cy.route('/brk/object-expand/*').as('getObjectExpand');
    cy.route('/bag/nummeraanduiding/?kadastraalobject=*').as('getNummeraanduidingen');

    cy.visit(URLS.business);

    cy.wait('@getResults');
    cy.wait('@getObjectExpand');
    cy.wait('@getNummeraanduidingen');
    cy.get('.c-panel--warning')
      .contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('.o-header__title').contains('A 0001');
    cy.get('.o-header__subtitle').should(($values) => {
      expect($values).to.not.contain('Aantekeningen');
    });
  });

  it('4. Should show a visitor limited info for an address', () => {
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
      expect($values).to.not.contain('Zakelijke rechten');
    });
    cy.get('.c-panel--warning').contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
  });

  it('5. Should show a visitor limited info for "Gemeentelijke beperking"', () => {
    cy.server();
    cy.route('/wkpb/beperking/*').as('getResults');
    cy.route('/wkpb/brondocument/?beperking=*').as('getBronDocument');
    cy.route('/brk/object/?beperkingen__id=*').as('getObject');

    cy.visit(URLS.gemeentelijkeBeperking);

    cy.wait('@getResults');
    cy.wait('@getBronDocument');
    cy.wait('@getObject');
    cy.get('.c-panel--warning')
      .contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('.o-header__title').contains('142');
    cy.get('.c-key-value-list').should(($values) => {
      expect($values).to.not.contain('Documentnaam');
    });
  });

  it('6. Should show a visitor limited map layers', () => {
    cy.visit(URLS.map);
    cy.get('.map-layers__category').should(($values) => {
      expect($values).to.contain('Geografie');
      expect($values).to.not.contain('Bedrijven - Invloedsgebieden');
    });
  });

  it('7A. Should not allow a visitor to view "Vestigingen"', () => {
    cy.visit(URLS.vestigingenTabel);
    cy.get('.c-panel--warning').contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('.c-table').should('not.exist');
  });

  it('7B. Should show a visitor limited "Pand" information', () => {
    cy.server();
    cy.route('/bag/pand/*').as('getResults');
    cy.route('/monumenten/monumenten/?betreft_pand=*').as('getMonumenten');
    cy.route('/bag/nummeraanduiding/?pand=*').as('getNummeraanduidingen');

    cy.visit(URLS.pand);

    cy.wait('@getResults');
    cy.wait('@getMonumenten');
    cy.wait('@getNummeraanduidingen');
    cy.get('.o-header__title').contains('036310001');
    cy.get('.c-panel--warning').contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('li').should(($values) => {
      expect($values).to.not.contain('aller');
    });
  });

  it('7C. Should show a visitor limited information in a Geo search', () => {
    cy.server();
    cy.defineGeoSearchRoutes();
    cy.route('/bag/pand/*').as('getResults');
    cy.route('/monumenten/monumenten/?betreft_pand=*').as('getMonumenten');
    cy.route('/bag/nummeraanduiding/?pand=*').as('getNummeraanduidingen');

    cy.visit(URLS.geoSearch);

    cy.waitForGeoSearch();
    cy.wait('@getResults');
    cy.wait('@getMonumenten');
    cy.wait('@getNummeraanduidingen');
    cy.get('.o-header').contains('393.70, 487385.19');
    cy.get('.c-panel--warning').contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('h2').should(($values) => {
      expect($values).to.not.contain('Vestigingen');
    });
    cy.get('button.toggle-fullscreen').click();
    cy.get('.map-search-results-category__header').should(($values) => {
      expect($values).to.not.contain('Vestigingen');
    });
  });

  it('7D. Should show a visitor limited information in a "ligplaats" search', () => {
    cy.server();
    cy.route('/bag/ligplaats/*').as('getResults');
    cy.route('/bag/nummeraanduiding/*').as('getNummeraanduiding');
    cy.route('/monumenten/situeringen/?betreft_nummeraanduiding=*').as('getMonument');

    cy.visit(URLS.ligplaats);

    cy.wait('@getResults');
    cy.wait('@getNummeraanduiding');
    cy.wait('@getMonument');
    cy.get('.o-header__title').contains('erdokska');
    cy.get('.c-panel--warning').contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('li').should(($values) => {
      expect($values).to.not.contain('alac');
    });
  });

  it('7E. Should show a visitor limited information in "standplaats" search', () => {
    cy.server();
    cy.route('/bag/standplaats/*').as('getResults');
    cy.route('/bag/nummeraanduiding/*').as('getNummeraanduiding');
    cy.route('/monumenten/situeringen/?betreft_nummeraanduiding=*').as('getMonument');

    cy.visit(URLS.standplaats);

    cy.wait('@getResults');
    cy.wait('@getNummeraanduiding');
    cy.wait('@getMonument');
    cy.get('.o-header__title').contains('Johan Broedeletstraat 20');
    cy.get('.c-panel--warning').contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('li').should(($values) => {
      expect($values).to.not.contain('us Bed');
    });
  });

  it('7F. Should not allow a visitor to view "vestiging"', () => {
    cy.visit(URLS.vestiging);
    cy.get('.o-header__title').should('not.exist');
    cy.get('.c-panel--warning').contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('dl.c-key-value-list').should('not.exist');
    cy.get('button.toggle-fullscreen').click();
    cy.get('.notification--info').contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('.map-detail-result__header-subtitle').should('not.exist');
  });

  it('7G. Should not allow a visitor to view "maatschappelijke activiteit"', () => {
    cy.visit(URLS.maatschappelijkeActiviteit);
    cy.get('.o-header__title').should('not.exist');
    cy.get('.c-panel--warning').contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('dl.c-key-value-list').should('not.exist');
  });

  it('8A. Should show a visitor limited information in "monument"', () => {
    cy.server();
    cy.route('/monumenten/monumenten/*').as('getMonument');
    cy.route('/monumenten/complexen/*').as('getComplex');
    cy.route('/monumenten/situeringen/?monument_id=*').as('getSitueringen');

    cy.visit(URLS.monument);

    cy.wait('@getMonument');
    cy.wait('@getComplex');
    cy.wait('@getSitueringen');
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
    cy.server();
    cy.route('/monumenten/complexen/*').as('getComplex');
    cy.route('/monumenten/monumenten/?complex_id=*').as('getMonumenten');

    cy.visit(URLS.monumentComplex);

    cy.wait('@getComplex');
    cy.wait('@getMonumenten');
    cy.get('.o-header__title').contains('Hortus Botanicus');
    cy.get('.c-panel--warning').contains('Medewerkers/ketenpartners van Gemeente Amsterdam');
    cy.get('dl.c-key-value-list dt').should(($values) => {
      expect($values).to.not.contain('Beschrijving');
    });
  });
});
