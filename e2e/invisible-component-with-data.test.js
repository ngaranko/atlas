'use strict';

describe('Invisible components should still load relevant data', () => {
    let page;

    it('the geometry of detail should be visible on a fullscreen map after a page refresh', () => {
        page = dp.navigate('MAP_DETAIL--NUMMERAANDUIDING');
        expect(page.dashboard.middleColumn.map.hasGeometry).toBe(true);

        // Make the map fullscreen
        page.dashboard.middleColumn.map.toggleFullscreen.click();
        dp.validate('MAP', page);
        expect(page.dashboard.middleColumn.map.hasGeometry).toBe(true);

        // Reload the page
        browser.refresh();
        dp.validate('MAP', page);
        expect(page.dashboard.middleColumn.map.hasGeometry).toBe(true);
    });

    it('the puntenwolk of data selection should still be visible on the fullscreen map after a page refresh', () => {
        page = dp.navigate('MAP_DATA-SELECTION');
        // There is no puntenwolk yet because there are too many results (> MAX_NUMBER_OF_CLUSTERED_MARKERS)
        expect(page.dashboard.middleColumn.map.hasPuntenwolk).toBe(false);

        // Switch to the TABLE view
        page.dashboard.rightColumn.dataSelection.header.toggleViewButton.click();
        dp.validate('DATA-SELECTION--TABLE', page);

        // Pick some filters to reduce the number of clustered markers
        page.dashboard.rightColumn.dataSelection.availableFilters.categories(0).options(0).click();
        page.dashboard.rightColumn.dataSelection.availableFilters.categories(1).options(0).click();

        // Switch back to LIST view
        page.dashboard.rightColumn.dataSelection.header.toggleViewButton.click();
        dp.validate('MAP_DATA-SELECTION', page);
        expect(page.dashboard.middleColumn.map.hasPuntenwolk).toBe(true);

        // Make the map fullscreen
        page.dashboard.middleColumn.map.toggleFullscreen.click();
        dp.validate('MAP', page);
        expect(page.dashboard.middleColumn.map.hasPuntenwolk).toBe(true);

        // Reload the page
        browser.refresh();
        dp.validate('MAP', page);
        expect(page.dashboard.middleColumn.map.hasPuntenwolk).toBe(true);
    });
});
