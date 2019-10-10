describe('homepage module', () => {
  beforeEach(() => {
    // go to the homepage
    cy.visit('/')
  })

  const HOMEPAGE = {
    highlightBlock: '[data-test=highlight-block]',
    navigationBlock: '[data-test=navigation-block]',
    specialBlock: '[data-test=special-block]',
    organizationBlock: '[data-test=organization-block]',
    aboutBlock: '[data-test=about-block]',
  }

  describe('user should be able to navigate to the content from the homepage', () => {
    it('should render all the frontpage elements', () => {
      cy.get(HOMEPAGE.highlightBlock)
        .should('exist')
        .scrollIntoView()
        .and('be.visible')

      cy.get(HOMEPAGE.navigationBlock)
        .should('exist')
        .scrollIntoView()
        .and('be.visible')

      cy.get(HOMEPAGE.specialBlock)
        .should('exist')
        .scrollIntoView()
        .and('be.visible')

      cy.get(HOMEPAGE.organizationBlock)
        .should('exist')
        .scrollIntoView()
        .and('be.visible')

      cy.get(HOMEPAGE.aboutBlock)
        .should('exist')
        .scrollIntoView()
        .and('be.visible')
    })
  })
})
