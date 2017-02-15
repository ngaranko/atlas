'use strict';

describe('Navigating forwards and backwards through history at straatbeeld', function () {
    let page;

    beforeEach(function () {
        dp.storage.clearAll();
    });

    it('goes backwards to search results and forwards to straatbeeld', function () {
        // Open search results (search by location)
        page = dp.navigate('MAP_SEARCH-RESULTS--LOCATION');
        const searchResultsTitle = page.title;

        // Open straatbeeld by clicking on the thumbnail
        page.dashboard.rightColumn.searchResults.straatbeeldThumbnail.link.click();
        const straatbeeldTitle = page.title;
        dp.validate('STRAATBEELD--SEARCH-RESULTS', page);

        // Go backwards to search results
        browser.navigate().back();
        dp.validate('MAP_SEARCH-RESULTS--LOCATION', page);
        expect(page.title).toBe(searchResultsTitle);

        // Go forwards to straatbeeld
        browser.navigate().forward();
        dp.validate('STRAATBEELD--SEARCH-RESULTS', page);
        expect(page.title).toBe(straatbeeldTitle);
    });

    it('goes backwards to a detail page and forwards to straatbeeld', function () {
        // Open a detail page
        page = dp.navigate('MAP_DETAIL--NUMMERAANDUIDING');
        const detailTitle = page.title;

        // Open straatbeeld by clicking on the thumbnail
        page.dashboard.rightColumn.detail.straatbeeldThumbnail.link.click();
        const straatbeeldTitle = page.title;
        dp.validate('STRAATBEELD--DETAIL', page);

        // Go backwards to the detail page
        browser.navigate().back();
        dp.validate('MAP_DETAIL--NUMMERAANDUIDING', page);
        expect(page.title).toBe(detailTitle);

        // Go forwards to straatbeeld
        browser.navigate().forward();
        dp.validate('STRAATBEELD--DETAIL', page);
        expect(page.title).toBe(straatbeeldTitle);
    });

    describe('clicking on the map when in straatbeeld', function () {
        it('goes backwards to previous pano, to fullscreen, to search results', function () {
            // Open search results (search by location)
            page = dp.navigate('MAP_SEARCH-RESULTS--LOCATION');
            const searchResultsTitle = page.title;

            // Open straatbeeld by clicking on the thumbnail
            page.dashboard.rightColumn.searchResults.straatbeeldThumbnail.link.click();
            dp.validate('STRAATBEELD--SEARCH-RESULTS', page);
            const straatbeeldTitle = page.title;

            // Open the map
            page.dashboard.rightColumn.straatbeeld.toggleStraatbeeldFullscreen.click();
            dp.validate('MAP_STRAATBEELD--SEARCH-RESULTS', page);
            const mapStraatbeeldTitle = page.title;

            // Click on the map (the straatbeeld coordinates should change)
            page.dashboard.middleColumn.map.click(100, 100);
            dp.validate('MAP_STRAATBEELD--SEARCH-RESULTS', page);
            expect(page.title).not.toBe(mapStraatbeeldTitle);

            // Go backwards to previous location (map still open)
            browser.navigate().back();
            dp.validate('MAP_STRAATBEELD--SEARCH-RESULTS', page);
            expect(page.title).toBe(mapStraatbeeldTitle);

            // Go backwards to straatbeeld fullscreen (map closed)
            browser.navigate().back();
            dp.validate('STRAATBEELD--SEARCH-RESULTS', page);
            expect(page.title).toBe(straatbeeldTitle);

            // Go backwards to search results
            browser.navigate().back();
            dp.validate('MAP_SEARCH-RESULTS--LOCATION', page);
            expect(page.title).toBe(searchResultsTitle);
        });

        it('goes backwards to previous pano, to fullscreen, to the detail page', function () {
            // Open a detail page
            page = dp.navigate('MAP_DETAIL--NUMMERAANDUIDING');
            const detailTitle = page.title;

            // Open straatbeeld by clicking on the thumbnail
            page.dashboard.rightColumn.detail.straatbeeldThumbnail.link.click();
            dp.validate('STRAATBEELD--DETAIL', page);
            const straatbeeldTitle = page.title;

            // Open the map
            page.dashboard.rightColumn.straatbeeld.toggleStraatbeeldFullscreen.click();
            dp.validate('MAP_STRAATBEELD--DETAIL', page);
            const mapStraatbeeldTitle = page.title;

            // Click on the map (the straatbeeld coordinates should change)
            page.dashboard.middleColumn.map.click(100, 100);
            dp.validate('MAP_STRAATBEELD--SEARCH-RESULTS', page);
            expect(page.title).not.toBe(mapStraatbeeldTitle);

            // Go backwards to previous location (map still open)
            browser.navigate().back();
            dp.validate('MAP_STRAATBEELD--DETAIL', page);
            expect(page.title).toBe(mapStraatbeeldTitle);

            // Go backwards to straatbeeld fullscreen (map closed)
            browser.navigate().back();
            dp.validate('STRAATBEELD--DETAIL', page);
            expect(page.title).toBe(straatbeeldTitle);

            // Go backwards to search results
            browser.navigate().back();
            dp.validate('MAP_DETAIL--NUMMERAANDUIDING', page);
            expect(page.title).toBe(detailTitle);
        });
    });

    it('goes from fullscreen map click to straatbeeld', function () {
        // Open straatbeeld
        page = dp.navigate('STRAATBEELD--SEARCH-RESULTS');
        dp.validate('STRAATBEELD--SEARCH-RESULTS', page);
        const title = page.title;

        // Open the map
        page.dashboard.rightColumn.straatbeeld.toggleStraatbeeldFullscreen.click();
        dp.validate('MAP_STRAATBEELD--SEARCH-RESULTS', page);

        // Open layer selection
        page.dashboard.middleColumn.map.toggleLayerSelection.click();
        dp.validate('LAYER-SELECTION_MAP', page);

        // Click on the map (straatbeeld should open with different coordinates)
        page.dashboard.middleColumn.map.click(100, 100);
        dp.validate('MAP_STRAATBEELD--SEARCH-RESULTS', page);
        expect(page.title).not.toBe(title);
    });
});
