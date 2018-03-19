/* eslint-disable */

function getNumberInText(text) {
  return parseInt(text.match(/\(([1-9.,]*)\)/)[1].replace('.', ''));
}

describe('search module', () => {
  beforeEach(() => {
    // go to the homepage
    cy.visit('/');
  });

  it('should show 4 categories when searching for the term "Oost"', () => {
    cy.get('#global-search').type('oost');
    cy.get('h4.qa-autocomplete-header').then((headers) => {
      expect(headers.length).to.eq(4)
    })
  });

  it('should show results when searching for "dam"', () => {
    cy.get('#global-search').type('dam');
    cy.get('.c-search-form').submit();
    cy.get('h2').contains('Openbare ruimtes').then((title) => {
      expect(getNumberInText(title.text())).to.equal(7)
    });
    cy.get('h2').contains('Adressen').then((title) => {
      expect(getNumberInText(title.text())).to.equal(369)
    });
    cy.get('h2').contains('Monumenten').then((title) => {
      expect(getNumberInText(title.text())).to.equal(49)
    });
    cy.get('h2').contains('Adressen').parent().parent().find('.c-show-more').click();
    cy.get('li').contains('nevenadres').should('exist').and('be.visible');
    cy.get('li').contains('verblijfsobject gevormd').should('exist').and('be.visible');
  });
});
