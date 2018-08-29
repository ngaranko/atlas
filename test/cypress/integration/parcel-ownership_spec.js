const dataSelection = '.c-data-selection';
const homepage = '.c-homepage';
const notification = '.c-panel--warning';
const table = '.c-table';

describe('parcel-ownership (eigendommen) module', () => {
  describe('user should be able to navigate to the parcel-ownership from the homepage', () => {
    it('should open the parcel-ownership page', () => {
      // go to the homepage
      cy.visit('/');
      // the homepage should be visible
      cy.get(homepage).should('exist').and('be.visible');
      // check if the link is in the dom and visible
      cy.get('#homepage-address-block').should('exist').and('be.visible');
      // the data-selection should not exist yet
      cy.get(dataSelection).should('not.exist');
      // click on the link to go to navigate to the page
      cy.get('.homepage-block__link').contains('Kadaster-tabel').click();
      // the homepage should not be visible anymore
      cy.get(homepage).should('not.be.visible');
      // the data selection should exist
      cy.get(dataSelection).should('exist').and('be.visible');
      // the title should contain Kadastrale objecten met zakelijk rechthebbenden
      cy.get('h1').contains('Kadastrale objecten met zakelijk rechthebbenden').should('exist').and('be.visible');
    });
  });

  describe('not authenticated', () => {
    beforeEach(() => {
      // go to the homepage
      cy.visit('/');
      // click on the link to go navigate to the page
      cy.get('.homepage-block__link').contains('Kadaster-tabel').click();
    });

    describe('user should not be able to view the kadaster data', () => {
      it('should show a notification that the user must authenticate', () => {
        // a warning notification should be shown that the user must authenticate
        cy.get(notification).should('exist').and('be.visible');
      });

      it('should not show the table with results', () => {
        // the table with results should not exist
        cy.get(table).should('not.exist').and('not.be.visible');
      });
    });
  });

  describe('authenticated', () => {
    before(() => {
      cy.login();
    });

    after(() => {
      cy.logout();
    });

    beforeEach(() => {
      cy.server();
      cy.route('/dataselectie/brk/*').as('getResults');

      // go to the homepage
      cy.visit('/');
      // click on the link to go to the eigendommen
      cy.get('.homepage-block__link').contains('Kadaster-tabel').click();

      cy.wait('@getResults');
      cy.scrollTo('top');
    });

    describe('user should be able to view the eigendommen', () => {
      it('should not show a notification', () => {
        // a warning notification should not exist
        cy.get(notification).should('not.exist').and('not.be.visible');
      });

      it('should show the table with results', () => {
        // the table with results should exist
        cy.get(table).should('exist').and('be.visible');
      });
    });

    describe('user should be able to navigate to the eigendommen detail view', () => {
      it('should open the correct detail view', () => {
        cy.server();
        cy.route('/brk/object-expand/*').as('getPerceel');

        cy.get('.c-table__content-row:first-child').click();

        cy.wait('@getPerceel');
        cy.get('.qa-detail').should('exist').and('be.visible');
      });
    });
  });
});
