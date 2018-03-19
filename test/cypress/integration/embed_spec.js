/* eslint-disable */
describe('print functionality', () => {
  beforeEach(() => {
    // go to the homepage
    cy.visit('/');
  });

  it('On should show 4 categories search term "Oost"', () => {
    cy.visit('/#?ate=T&mpb=topografie&mpz=8&mpfs=T&mpo=exvg::T:exin::T:exuo::T&mpv=52.3733262:4.8934106&pgn=home');
    cy.get('header').should('not.exist');
    cy.get('#map-embed-button').contains('City Data').should('exist').and('be.visible');
    cy.get('h4.map-legend__category-title').then((titles) => {
      expect(titles.length).to.eq(3);
    });
    cy.get('input[type="checkbox"]').should('not.be.visible');

  });
});
