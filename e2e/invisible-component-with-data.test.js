'use strict';

const validator = require('./validators/validator');
let page;

describe('Invisible components should still load relevant data', () => {
    it('the geometry of detail should be visible on a fullscreen map after a page refresh', () => {
        page = dp.navigate('MAP_DETAIL--NUMMERAANDUIDING');
        expect(page.dashboard.middleColumn.map.hasGeometry).toBe(true);

        // Make the map fullscreen
        page.dashboard.middleColumn.map.toggleFullscreen.click();
        dp.availableStates['MAP'].validator(page);
        expect(page.dashboard.middleColumn.map.hasGeometry).toBe(true);

        // Reload the page
        browser.refresh();
        dp.availableStates['MAP'].validator(page);
        expect(page.dashboard.middleColumn.map.hasGeometry).toBe(true);
    });

    fit('the puntenwolk of data selection should still be visible on the fullscreen map after a page refresh', () => {
        page = dp.navigate('MAP_DATA-SELECTION');
        expect(page.dashboard.middleColumn.map.hasPuntenwolk).toBe(true);

        // There is no puntenwolk yet because there are too many results (> MAX_NUMBER_OF_CLUSTERED_MARKERS)
        // expect(page.dashboard.middleColumn.map.hasPuntenwolk).toBe(false);

        // Switch to the TABLE view
        page.dashboard.rightColumn.dataSelection.header.toggleViewButton.click();
        dp.availableStates['DATA-SELECTION--TABLE'].validator(page);

        // Pick some filters to reduce the number of clustered markers

        // Switch back to LIST view
        page.dashboard.rightColumn.dataSelection.header.toggleViewButton.click();
        dp.availableStates['MAP_DATA-SELECTION'].validator(page);

        // Make the map fullscreen
        page.dashboard.middleColumn.map.toggleFullscreen.click();
        dp.availableStates['MAP'].validator(page);

        // Reload the page
        /*
        browser.refresh();
        dp.availableStates['MAP'].validator(page);
        expect(page.dashboard.middleColumn.map.hasPuntenwolk).toBe(true);
        */
    });
});
