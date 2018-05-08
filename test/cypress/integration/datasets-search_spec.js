const datasetsTab = '.o-tabs__tab--link';
const datasetsCard = '.c-data-selection-catalog__item';

describe('datasets search module', () => {
  before(() => {
    cy.login();
  });

  after(() => {
    cy.logout();
  });

  describe('user should be to type and see suggestions', () => {
    it('should open the autocomplete panel', () => {
      cy.server();
      // TODO: enable this (getTypeAhead) once fetch is supported by Cypress
      // https://github.com/cypress-io/cypress/issues/95
      // cy.route('/typeahead?q=Park').as('getTypeAhead');

      cy.visit('/');
      cy.get('.auto-suggest__input').trigger('focus');
      cy.get('.auto-suggest__input').type('Park');
      cy.get('.auto-suggest__input').trigger('change');

      // TODO: remove wait(500) and enably the route-wait
      cy.wait(500);
      // cy.wait('@getTypeAhead');

      cy.get('.auto-suggest').should('exist').and('be.visible');
    });
  });

  describe('user should be able to search and see results', () => {
    it('should open the datasets results', () => {
      cy.server();
      cy.defineSearchRoutes();

      cy.visit('/');
      cy.get('.auto-suggest__input').trigger('focus');
      cy.get('.auto-suggest__input').type('Park');
      cy.get('.auto-suggest').submit();
      cy.waitForSearch();

      cy.get(datasetsTab).contains('Datasets').click();
      cy.get(datasetsCard).should('exist').and('be.visible');
    });

    it('should not open the datasets results because there are no results', () => {
      cy.server();
      cy.defineSearchRoutes();

      cy.visit('/');
      cy.get('.auto-suggest__input').trigger('focus');
      cy.get('.auto-suggest__input').type('NORESULTS');
      cy.get('.auto-suggest').submit();
      cy.waitForSearch();

      cy.get(datasetsTab).should('not.exist').and('not.be.visible');
      cy.get(datasetsCard).should('not.exist').and('not.be.visible');
    });
  });
});
