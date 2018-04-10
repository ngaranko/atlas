import { getCountFromHeader } from '../support/helper-functions';

describe('search module', () => {
  beforeEach(() => {
    // go to the homepage
    cy.visit('/');
  });

  it('should show 4 categories when searching for the term "Oost"', () => {
    cy.server();
    // TODO: enable this (getResults) once fetch is supported by Cypress
    // https://github.com/cypress-io/cypress/issues/95
    // cy.route('/typeahead?q=oost').as('getResults');

    cy.get('#auto-suggest__input').type('oost');

    // TODO: remove wait(500) and enably the route-wait
    cy.wait(500);
    // cy.wait('@getResults');
    // count the headers inside the autocomplete
    cy.get('h4.qa-auto-suggest-header').then((headers) => {
      expect(headers.length).to.eq(4);
    });
  });

  it('should show results when searching for "dam"', () => {
    cy.server();
    cy.defineSearchRoutes();

    cy.get('#auto-suggest__input').type('dam');
    // submit search form
    cy.get('.auto-suggest').submit();

    cy.waitForSearch(false);
    cy.get('h2').contains('Openbare ruimtes').then((title) => {
      expect(getCountFromHeader(title.text())).to.be.within(2, 10);
    });
    cy.get('h2').contains('Adressen').then((title) => {
      expect(getCountFromHeader(title.text())).to.be.within(250, 450);
    });
    cy.get('h2').contains('Monumenten').then((title) => {
      expect(getCountFromHeader(title.text())).to.be.within(10, 100);
    });
    cy.get('h2').contains('Adressen').parent().parent().find('.c-show-more').click();
    cy.get('li').contains('nevenadres').should('exist').and('be.visible');
    cy.get('li').contains('verblijfsobject gevormd').should('exist').and('be.visible');
  });
});
