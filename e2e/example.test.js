const navigate = require('./helpers/navigate');

const validateHomepage = require('./validators/homepage');
const validateLayerSelection = require('./validators/layer-selection');
const validateMapFullscreen = require('./validators/map-fullscreen');

describe('Even lekker testen', function () {
    let page;

    it('navigate from home to layer selection', function () {
        page = navigate('HOMEPAGE');
        validateHomepage(page);

        // Open layer selection
        page.dashboard().middleColumn().map().toggleLayerSelection().click();
        validateLayerSelection(page);

        // Close layer selection
        page.dashboard().middleColumn().map().toggleLayerSelection().click();
        validateHomepage(page);
    });

    it('make the map fullscreen from the homepage', function () {
        page = navigate('HOMEPAGE');
        validateHomepage(page);

        // Make the map fullscreen
        page.dashboard().middleColumn().map().toggleFullscreen().click();
        validateMapFullscreen(page);

        // Make the map small again
        page.dashboard().middleColumn().map().toggleFullscreen().click();
        validateHomepage(page);
    });
});
