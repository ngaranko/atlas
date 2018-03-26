// helper function to check values in previewpanel
Cypress.Commands.add('checkPreviewPanel', (values) => {
  cy.get('.map-preview-panel.map-preview-panel--visible').get('img.map-detail-result__header-pano').should('exist').and('be.visible');
  cy.get('.map-preview-panel.map-preview-panel--visible').should(($values) => {
    if (Array.isArray(values)) {
      values.forEach((val) => {
        expect($values).to.contain(val);
      });
    } else {
      expect($values).to.contain(values);
    }
  });
});
