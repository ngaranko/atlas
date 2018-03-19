// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


Cypress.Commands.add('checkPreviewPanel', (values) => {
  cy.get('.map-preview-panel.map-preview-panel--visible').get('img.map-detail-result__header-pano').should('exist').and('be.visible');
  cy.get('.map-preview-panel.map-preview-panel--visible').should(($values) => {
    if (Array.isArray(values)) {
      values.forEach((val) => {
        expect($values).to.contain(val);
      })
    } else {
      expect($values).to.contain(values);
    }
  });
});
