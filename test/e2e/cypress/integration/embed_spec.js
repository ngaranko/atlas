const checkbox = 'input[type="checkbox"]';
const header = 'header';

describe('embed module', () => {
  beforeEach(() => {
    // go to the homepage
    cy.visit('/');
  });

  it('should show the user the embed view of the map', () => {
    cy.visit('/kaart?lagen=YmdlbToxfGtnZW06MHxrc2VjOjB8a290OjE%3D&locatie=52.37732239072315%2C4.895808658950058&zoom=14');
    cy.get(header).should('exist');
    cy.get(checkbox).should('exist').and('be.visible');

    cy.visit('/kaart?lagen=YmdlbToxfGtnZW06MHxrc2VjOjB8a290OjE%3D&locatie=52.37732239072315%2C4.895808658950058&zoom=14&embed=true');
    cy.get(header).should('not.exist');
    cy.get('.c-embed-button').contains('City Data').should('exist').and('be.visible');
    // this link has 1 layers active
    cy.get('h4.map-legend__category-title').then((titles) => {
      expect(titles.length).to.eq(1);
    });
    // this layer has 2 active legend items
    cy.get('ul.map-legend__items').find('li.map-legend__item').should('have.length', 2)

    // the user should not be able to toggle map layers
    cy.get(checkbox).should('not.be.visible');
  });
});
