/* eslint-disable */
import { login, logout } from '../services/authentication';
import '../support';

describe('data search module', () => {
  before(() => {
    login();
  });

  after(() => {
    logout();
  });

  it('user should see suggestions', () => {
    // open the autocomplete panel and select the first dataset option and route the correct address
    cy.visit('/');
    cy.get('input.js-search-input').trigger('focus');
    cy.get('input.js-search-input').type('Park');
    cy.get('input.js-search-input').trigger('change');
    cy.get('.c-autocomplete').should('exist').and('be.visible');
    cy.get('h4').contains('Straatnamen').siblings('ul').children('li').first().children().first()
    .then(($el) => {
      const firstValue = $el[0].innerText;
      cy.get('h4').contains('Straatnamen').siblings('ul').children('li').first().click();
      cy.get('.o-header__title').contains(firstValue).should('exist').and('be.visible');
    });
  });

  describe('user should be able to submit', () => {
    beforeEach(() => {
      cy.server()
      cy.route('https://acc.api.data.amsterdam.nl/catalogus/api/3/action/*').as('getResults')
      cy.visit('/');
      cy.get('input.js-search-input').trigger('focus');
    });

    it('should submit the search and give results', () => {
      cy.get('input.js-search-input').type('Park');
      cy.get('.c-search-form').submit();
      cy.wait('@getResults');
      cy.get('.o-list').should('exist').and('be.visible')
    });

    it('should submit the search and give no results', () => {
      cy.get('input.js-search-input').type('NORESULTS');
      cy.get('.c-search-form').submit();
      cy.wait('@getResults');
      cy.get('.o-list').should('have.length', 0);
    });
  });
});

describe('verblijfsobject / nummeraanduiding check', () => {
  it('should open the address catalogus', () => {
    cy.viewport(1000, 660); // ensure the viewport is always the same in this test, so the clicks can be aligned properly
    cy.visit('/');
    cy.get('#global-search').focus().type('Ad Windighof 2');
    cy.get('.c-autocomplete').contains('Ad Windighof 2').click();

    cy.get('.qa-dashboard__column--right').should('exist').and('be.visible');
    cy.get('.qa-dashboard__column--right').get('.qa-title span').contains('Ad Windighof 2').and('have.css', 'font-style').and('match', /italic/);
    cy.get('.qa-dashboard__column--right').get('dl').contains('1087HE');
    cy.get('.qa-dashboard__column--right').get('img.c-straatbeeld-thumbnail--img').should('exist').and('be.visible');

    cy.get('.c-panel--danger').should('exist').and('be.visible').contains('Status: Verblijfsobject gevormd');
    cy.get('.qa-map-container').click(166, 304);
    cy.get('.c-search-results__block-content').should('exist').and('be.visible').contains('Ad Windighof 2').click();

    cy.get('.qa-dashboard__column--right').should('exist').and('be.visible');
    cy.get('.qa-dashboard__column--right').get('.qa-title span').contains('Ad Windighof 2').and('have.css', 'font-style').and('match', /italic/);
    cy.get('.qa-dashboard__column--right').get('dl').contains('1087HE');
    cy.get('.qa-dashboard__column--right').get('img.c-straatbeeld-thumbnail--img').should('exist').and('be.visible');

    cy.get('button.toggle-fullscreen').click();

    cy.get('.qa-dashboard__column--right').should('exist').and('not.be.visible');
    cy.get('.map-preview-panel.map-preview-panel--visible').get('img.map-detail-result__header-pano').should('exist').and('be.visible');
    cy.checkPreviewPanel(['Ad Windighof 2', 'Verblijfsobject gevormd']);
    cy.get('.c-panel--danger').should('not.exist').and('not.be.visible');

  });
});
