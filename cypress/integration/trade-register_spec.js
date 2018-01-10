/* eslint-disable */
import { login, logout } from '../services/authentication';

describe('trade-register module', () => {

  describe('user should be able to navigate to the trade-register from the homepage', () => {
    it('should open the trade register', () => {
      // go to the homepage
      cy.visit('http://localhost:8080/');
      // check if the link is in the dom and visible
      cy.get('.c-homepage__block--vestigingen').should('exist').and('be.visible');
      // the data-selection should not exist yet
      cy.get('.c-data-selection').should('not.exist');
      // click on the link to go to the datasets without a specified catalogus theme
      cy.get('.c-homepage__block--vestigingen').click();
      // the homepage should not be visible anymore
      cy.get('.c-homepage').should('not.be.visible');
      // the data selection should exist
      cy.get('.c-data-selection').should('exist').and('be.visible');
      // the title should contain Adressen
      cy.get('h1').contains('Vestigingen').should('exist').and('be.visible');
    });
  });

  describe('not authenticated', () => {
    beforeEach(() => {
      // go to the homepage
      cy.visit('http://localhost:8080/');
      // click on the link to go to the trade register
      cy.get('.c-homepage__block--vestigingen').click();
    });

    describe('user should not be able to view the trade register', () => {
      it('should show a notification that the user must authenticate', () => {
        // a warning notification should be shown that the user must authenticate
        cy.get('.c-panel--warning').should('exist').and('be.visible');
      });

      it('should not show the table with results', () => {
        // the table with results should not exist
        cy.get('.c-table').should('not.exist').and('not.be.visible');
      });
    });
  });

  describe('authenticated', () => {
    before(() => {
      login();
    });

    after(() => {
      logout();
    })

    beforeEach(() => {
      // go to the homepage
      cy.visit('http://localhost:8080/');
      // click on the link to go to the trade register
      cy.get('.c-homepage__block--vestigingen').click();
    });

    describe('user should be able to view the trade register', () => {
      it('should not show a notification', () => {
        // a warning notification should not exist
        cy.get('.c-panel--warning').should('not.exist').and('not.be.visible');
      });

      it('should show the table with results', () => {
        // the table with results should exist
        cy.get('.c-table').should('exist').and('be.visible');
      });
    });

    describe('user should be able to navigate to the trade register detail view', () => {
      it('should open the correct detail view', () => {

        cy.get('tr.c-table__content-row').first().find('td').first()
        .then((firstValue) => {
          // remove whitespace and line breaks that are created by cypress
          const selectedValue = firstValue[0].innerText.replace(/^\s+|\s+$/g, '');
          // scroll to top so first item is in view
          cy.scrollTo('top');
          // click on the firstItem
          cy.get('.c-table__content-row:first-child').click();
          // the detail view should exist
          cy.get('.qa-detail').should('exist').and('be.visible');
          // the selectedValue should exist as a sibling
          cy.get('.c-key-value-list').find('dd').contains(selectedValue).should('exist').and('be.visible');
        });
      });
    });
  });
});
