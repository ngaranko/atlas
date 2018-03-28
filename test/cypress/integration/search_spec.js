import { defineSearchRoutes, waitForSearch } from '../services/routing';

// helper function, to extract the number in the titles
function getNumberInText(text) {
  return parseInt(text.match(/\(([1-9.,]*)\)/)[1].replace('.', ''), 10);
}

describe('search module', () => {
  beforeEach(() => {
    // go to the homepage
    cy.visit('/');
  });

  it('should show 4 categories when searching for the term "Oost"', () => {
    cy.server();
    cy.route('/typeahead?q=oost').as('getResults');

    cy.get('#global-search').type('oost');

    cy.wait('@getResults');
    // count the headers inside the autocomplete
    cy.get('h4.qa-autocomplete-header').then((headers) => {
      expect(headers.length).to.eq(4)
    })
  });

  it('should show results when searching for "dam"', () => {
    cy.server();
    defineSearchRoutes();

    cy.get('#global-search').type('dam');
    // submit search form
    cy.get('.c-search-form').submit();

    waitForSearch(false);
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
