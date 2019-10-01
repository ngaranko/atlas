import { HEADER, MAP } from '../support/selectors'
import { routing } from '../../../../src/app/routes'
import PARAMETERS from '../../../../src/store/parameters'

const { VIEW, VIEW_CENTER, LAYERS, LEGEND, EMBED, EMBED_PREVIEW } = PARAMETERS

const checkbox = 'input[type="checkbox"]'
const checkboxChecked = 'input[type="checkbox"]:checked'

describe('embed module', () => {
  beforeEach(() => {
    // go to the homepage
    cy.visit('/')
  })

  it('should show the user the embed preview of the map', () => {
    cy.visit(
      `/${routing.data.path}?${VIEW_CENTER}=52.3617139%2C4.8888734&${LAYERS}=bgem%3A1%7Ckgem%3A1%7Cksec%3A0%7Ckot%3A0&${LEGEND}=true&${VIEW}=kaart`,
    )
    cy.get(HEADER.root).should('exist')
    cy.get(checkbox)
      .should('exist')
      .and('be.visible')

    cy.get(MAP.contextMenu)
      .click()
      .get(`${MAP.contextMenuItemEmbed}`)
      .click()

    // the header should be hidden
    cy.get(HEADER.root).should('not.exist')
    // the embed preview parameter should be present in the url
    cy.url().should(
      'include',
      `?${VIEW}=kaart&${VIEW_CENTER}=52.3617139%2C4.8888734&${EMBED_PREVIEW}=true&${LAYERS}=bgem%3A1%7Ckgem%3A1%7Cksec%3A0%7Ckot%3A0&${LEGEND}=true`,
    )
  })

  it('should show the user the embed view of the map', () => {
    cy.visit(
      `/${routing.data.path}?${VIEW_CENTER}=52.3617139%2C4.8888734&${EMBED}=true&${LAYERS}=bgem%3A1%7Ckgem%3A1%7Cksec%3A0%7Ckot%3A0&${LEGEND}=true&${VIEW}=kaart`,
    )
    // the header should be hidden
    cy.get(HEADER.root).should('not.exist')
    // the button to go to homepage should exist
    cy.get(MAP.embedButton)
      .contains('data.amsterdam.nl')
      .should('exist')
      .and('be.visible')
    // this link has 1 layers active
    cy.get('h4.map-legend__category-title').then(titles => {
      expect(titles.length).to.eq(1)
    })
    // this layer has 2 active legend items
    cy.get('ul.map-legend__items')
      .find('li.map-legend__item')
      .should('have.length', 4)
    // the user should be able to toggle map layers
    cy.get(checkbox).should('have.length', 5)
    cy.get(checkboxChecked).should('have.length', 3)
  })
})
