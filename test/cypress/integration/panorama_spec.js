/* eslint-disable */
describe('panorama module', () => {
  beforeEach(() => {
    // go to the homepage
    cy.visit('/');
    // check if the link is in the dom and visible
    cy.get('.qa-straatbeeld-link').should('exist').and('be.visible');
    // the map should not exist yet
    cy.get('.c-straatbeeld').should('not.exist');
    // click on the link to go to the map
    cy.get('.qa-straatbeeld-link').click();
  });

  describe('user should be able to navigate to the panoram from the homepage', () => {
    it('should open the panorama viewer', () => {
      // the homepage should not be visible anymore
      cy.get('.c-homepage').should('not.be.visible');
      // the map should be visible
      cy.get('.c-straatbeeld').should('exist').and('be.visible');
    });
  });

  describe('user should be able to use the panorama viewer', () => {

    // TODO: activate, skipping now because canvas is never found when test runs from inside Docker container
    it.skip('should render the marzipano viewer', () => {
      // the canvas inside de marzipano viewer should exist and be visible
      cy.get('.js-marzipano-viewer').find('canvas').should('exist').and('be.visible');
    });

    it('should be able to click a hotspot and change the coordinates', () => {
      cy.get('.c-straatbeeld-status-bar__info-item').first()
      .then((coordinatesEl) => {
        const coordinates = coordinatesEl[0].innerText;
        // the click the first hotspot
        cy.get('.qa-hotspot-button:visible').first().click();
        // the coordinates should be different
        cy.get('.c-straatbeeld-status-bar__info-item').first().contains(coordinates).should('not.exist');
      });
    });
  });

  describe('user should be able to use the leaflet map', () => {
    it('should render the leaflet map and set the marker', () => {
      // the canvas inside de marzipano viewer should exist and be visible
      cy.get('.leaflet-marker-pane').find('img').should('exist').and('be.visible');
    });

    it('should set the panoramabeelden as active layers in the map-panel legenda', () => {
      // open the the map panel (closed initially)
      cy.get('.map-panel__toggle').click();
      // should contain the correct value
      cy.get('.map-legend__category-title').contains('Panoramabeelden').should('exist').and('be.visible');
    });

    it('should set the layers in the leaflet map', () => {
      // should contain the correct value
      cy.get('.leaflet-image-layer').should('exist').and('be.visible');
    });

    it('should change the coordinates when clicked on the map', () => {
      cy.get('.c-straatbeeld-status-bar__info-item').first()
      .then((coordinatesEl) => {
        const coordinates = coordinatesEl[0].innerText;
        // click on the leaflet map with a different position
        cy.get('.s-leaflet-draw').trigger('click', 20, 100);
        // the coordinates should be different
        cy.get('.c-straatbeeld-status-bar__info-item').first().contains(coordinates).should('not.exist');
      });
    });
  });

  describe('user should be able to interact with the panorama', () => {
    it('should remember the state when closing the pano, and update to search results when clicked in map', () => {
      const panoUrl = '/#?dte=bag%2Fverblijfsobject%2F03630003761571%2F&mpb=topografie&mpz=16&mpo=pano::T&mpv=52.373434:4.8936217&sbf=Cu&sbh=-Mh&sbi=TMX7315120208-000073_pano_0005_000460&sbl=ZRXE4:3JKXp&sbp=r';
      let newUrl;

      cy.viewport(1000, 660);
      cy.get('.leaflet-marker-pane').find('img').should('exist').and('be.visible');
      cy.get('#global-search').type('dam 1');
      cy.get('.c-autocomplete').contains('Dam 1').click();
      cy.get('img.c-straatbeeld-thumbnail--img').should('exist').and('be.visible');
      cy.get('h2.qa-title').should('exist').and('be.visible').contains('Dam 1');
      cy.get('img.c-straatbeeld-thumbnail--img').click();

      // mimic user drag to right
      cy.visit(panoUrl);
      let largestButtonSize = 0;
      let largestButton;
      cy.get('.qa-hotspot-rotation:visible').each((button) => {
        // get largest (e.g. closest by) navigation button
        cy.wrap(button).should('have.css', 'width').then((width) => {
          if (parseInt(width.replace('px', '')) > largestButtonSize) {
            largestButtonSize = parseInt(width.replace('px', ''));
            largestButton = button;
          }
        });
      }).then(() => {
        largestButton.click();
      });
      cy.wait(2000);

      cy.location().then((loc) => {
        newUrl = loc.pathname + loc.hash;
        expect(newUrl).not.to.equal(panoUrl)
      });

      cy.get('button.c-straatbeeld__close').click();
      cy.get('img.c-straatbeeld-thumbnail--img').should('exist').and('be.visible');
      cy.get('h2.qa-title').should('exist').and('be.visible').contains('Dam 1');
      cy.get('img.c-straatbeeld-thumbnail--img').click();

      cy.get('.s-leaflet-draw').click(20, 100);

      cy.location().then((loc) => {
        const thisUrl = loc.pathname + loc.hash;
        expect(thisUrl).to.not.equal(newUrl);
      });
      cy.get('button.c-straatbeeld__close').click();
      cy.get('h1.o-header__title').contains('Resultaten').should('exist').and('be.visible');
      cy.get('h2').contains('Openbare ruimte').should('exist').and('be.visible')
    });
  });
});
