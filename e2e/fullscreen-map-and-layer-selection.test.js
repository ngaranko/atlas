'use strict';

describe('The fullscreen map (or map w/ layerSelection) remembers how you got there', () => {
    let page;

    it('navigates to a new straatbeeld if straatbeeld is active but invisible', () => {
        page = dp.navigate('MAP_STRAATBEELD--DETAIL');

        // Open layerSelection
        page.dashboard.middleColumn.map.toggleLayerSelection.click();
        dp.validate('LAYER-SELECTION_MAP', page);

        // Click on the map, return to (a different) straatbeeld
        page.dashboard.middleColumn.map.click(100, 100);
        dp.validate('MAP_STRAATBEELD--SEARCH-RESULTS', page);
    });

    it('remembers the active detail page when opening and closing layer selection', () => {
        page = dp.navigate('MAP_DETAIL--NUMMERAANDUIDING');
        const initialPageTitle = page.title;

        // Open layer selection
        page.dashboard.middleColumn.map.toggleLayerSelection.click();
        dp.validate('LAYER-SELECTION_MAP', page);

        // Close layer selection and return to the detail page
        page.dashboard.leftColumn.layerSelection.close();
        dp.validate('MAP_DETAIL--NUMMERAANDUIDING', page);
        expect(page.title).toBe(initialPageTitle);
    });

    it('remembers the active detail page when playing with layer selection followed by a fullscreen map', () => {
        page = dp.navigate('MAP_DETAIL--NUMMERAANDUIDING');
        const initialPageTitle = page.title;

        // Open layer selection
        page.dashboard.middleColumn.map.toggleLayerSelection.click();
        dp.validate('LAYER-SELECTION_MAP', page);

        // Make the map fullscreen
        page.dashboard.middleColumn.map.toggleFullscreen.click();
        dp.validate('MAP', page);

        // Make the map small again, return to the detail page (and NOT to layer selection)
        page.dashboard.middleColumn.map.toggleFullscreen.click();
        dp.validate('MAP_DETAIL--NUMMERAANDUIDING', page);
        expect(page.title).toBe(initialPageTitle);
    });

    it('remembers the active detail page when playing with a fullscreen map followed by layer selection', () => {
        page = dp.navigate('MAP_DETAIL--NUMMERAANDUIDING');
        const initialPageTitle = page.title;

        // Make the map fullscreen
        page.dashboard.middleColumn.map.toggleFullscreen.click();
        dp.validate('MAP', page);

        // Open layer selection
        page.dashboard.middleColumn.map.toggleLayerSelection.click();
        dp.validate('LAYER-SELECTION_MAP', page);

        // Make the map small and return to the detail page (and NOT to layer selection)
        page.dashboard.middleColumn.map.toggleFullscreen.click();
        dp.validate('MAP_DETAIL--NUMMERAANDUIDING', page);
        expect(page.title).toBe(initialPageTitle);
    });

    it('remebers the detail and fullscreen map state when toggling the layer selection panel', () => {
        page = dp.navigate('MAP_DETAIL--NUMMERAANDUIDING');
        const initialPageTitle = page.title;

        // Make the map fullscreen
        page.dashboard.middleColumn.map.toggleFullscreen.click();
        dp.validate('MAP', page);

        // Open layer selection
        page.dashboard.middleColumn.map.toggleLayerSelection.click();
        dp.validate('LAYER-SELECTION_MAP', page);

        // Close layer selection, return to the fullscreen map
        page.dashboard.middleColumn.map.toggleLayerSelection.click();
        dp.validate('MAP', page);

        // Make the map small, return to the detail page
        page.dashboard.middleColumn.map.toggleFullscreen.click();
        dp.validate('MAP_DETAIL--NUMMERAANDUIDING', page);
        expect(page.title).toBe(initialPageTitle);
    });
});
