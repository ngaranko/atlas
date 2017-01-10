const indexPage = require('./pages/index.js');

describe('Even lekker testen', function () {
    let homepage;

    beforeEach(function () {
        homepage = indexPage('http://localhost:8000');
    });

    it('sets the <title> element', function () {
        expect(homepage.title()).toBe('Home - Atlas');
    });

    it('shows the map (middle: 1/3) and home (right: 2/3)', function () {
        expect(homepage.dashboard().leftColumn().columnSize()).toBe(0);

        expect(homepage.dashboard().middleColumn().columnSize()).toBe(4);
        expect(homepage.dashboard().middleColumn().map().isVisible()).toBe(true);

        expect(homepage.dashboard().rightColumn().columnSize()).toBe(8);
        expect(homepage.dashboard().rightColumn().page().isVisible()).toBe(true);

        // Making sure the other components are inactive
        expect(homepage.dashboard().leftColumn().layerSelection().isActive()).toBe(false);
        expect(homepage.dashboard().rightColumn().dataSelection().isActive()).toBe(false);
        expect(homepage.dashboard().rightColumn().detail().isActive()).toBe(false);
        expect(homepage.dashboard().rightColumn().searchResults().isActive()).toBe(false);
        expect(homepage.dashboard().rightColumn().straatbeeld().isActive()).toBe(false);
    });

    it('navigate from home to layer selection', function () {
        homepage.dashboard().middleColumn().map().toggleLayerSelection().click();

        expect(homepage.title()).toBe('Selecteer kaartlagen - Atlas');

        expect(homepage.dashboard().leftColumn().columnSize()).toBe(4);
        expect(homepage.dashboard().leftColumn().layerSelection().isVisible()).toBe(true);

        expect(homepage.dashboard().middleColumn().columnSize()).toBe(8);
        expect(homepage.dashboard().middleColumn().map().isVisible()).toBe(true);

        // The underlying page remains active, but is invisible
        expect(homepage.dashboard().rightColumn().page().isActive()).toBe(true);
        expect(homepage.dashboard().rightColumn().page().isVisible()).toBe(false);

        // The rest is inactive
        expect(homepage.dashboard().rightColumn().columnSize()).toBe(0);
        expect(homepage.dashboard().rightColumn().dataSelection().isActive()).toBe(false);
        expect(homepage.dashboard().rightColumn().detail().isActive()).toBe(false);
        expect(homepage.dashboard().rightColumn().searchResults().isActive()).toBe(false);
        expect(homepage.dashboard().rightColumn().straatbeeld().isActive()).toBe(false);
    });
});
