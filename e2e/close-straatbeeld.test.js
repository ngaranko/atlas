'use strict';

const validator = require('./validators/validator');

describe('Navigating to and away from straatbeeld', function () {
    let page;

    it('goes from search results back to the same search results', function () {
        // Open search results (search by location)
        page = dp.navigate('MAP_SEARCH-RESULTS--LOCATION');
        const titleBefore = page.title;

        // Open straatbeeld by clicking on the thumbnail
        page.dashboard.rightColumn.searchResults.straatbeeldThumbnail.click();
        validator('STRAATBEELD--SEARCH-RESULTS', page);

        // Close straatbeeld by clicking the close button
        // We should be back at the same search results
        page.dashboard.rightColumn.straatbeeld.close.click();
        validator('MAP_SEARCH-RESULTS--LOCATION', page);

        const titleAfter = page.title;
        expect(titleAfter).toBe(titleBefore);
    });

    it('goes from a detail page back to the same detail page', function () {
        // Open a detail page
        page = dp.navigate('MAP_DETAIL--NUMMERAANDUIDING');
        const titleBefore = page.title;

        // Open straatbeeld by clicking on the thumbnail
        page.dashboard.rightColumn.detail.straatbeeldThumbnail.click();
        validator('STRAATBEELD--DETAIL', page);

        // Close straatbeeld by clicking the close button
        // We should be back at the same detail page
        page.dashboard.rightColumn.straatbeeld.close.click();
        validator('MAP_DETAIL--NUMMERAANDUIDING', page);

        const titleAfter = page.title;
        expect(titleAfter).toBe(titleBefore);
    });

    describe('clicking on the map when in straatbeeld', function () {
        it('goes from search results back to different search results', function () {
            // Open search results (search by location)
            page = dp.navigate('MAP_SEARCH-RESULTS--LOCATION');
            const titleBefore = page.title;

            // Open straatbeeld by clicking on the thumbnail
            page.dashboard.rightColumn.searchResults.straatbeeldThumbnail.click();
            validator('STRAATBEELD--SEARCH-RESULTS', page);

            // Open the map
            page.dashboard.rightColumn.straatbeeld.toggleMap.click();
            validator('MAP_STRAATBEELD--DETAIL', page);

            // Click on the map (the straatbeeld coordinates should change)
            const coordinatesBefore = page.dashboard.rightColumn.straatbeeld.metadata.coordinates;
            browser.actions().
                mouseMove(page.dashboard.middleColumn.map.element, {x: 100, y: 100}).
                click().
                perform();
            const coordinatesAfter = page.dashboard.rightColumn.straatbeeld.metadata.coordinates;

            validator('MAP_STRAATBEELD--DETAIL', page);
            expect(coordinatesAfter).not.toBe(coordinatesBefore);

            // Close straatbeeld by clicking the close button
            // We should be back at the same search results
            page.dashboard.rightColumn.straatbeeld.close.click();
            validator('MAP_SEARCH-RESULTS--LOCATION', page);

            const titleAfter = page.title;
            expect(titleAfter).not.toBe(titleBefore);
        });

        it('goes from a detail page back to search results', function () {
            // Open a detail page
            page = dp.navigate('MAP_DETAIL--NUMMERAANDUIDING');

            // Open straatbeeld by clicking on the thumbnail
            page.dashboard.rightColumn.detail.straatbeeldThumbnail.click();
            validator('STRAATBEELD--DETAIL', page);

            // Open the map
            page.dashboard.rightColumn.straatbeeld.toggleMap.click();
            validator('MAP_STRAATBEELD--DETAIL', page);

            // Click on the map (the straatbeeld coordinates should change)
            const coordinatesBefore = page.dashboard.rightColumn.straatbeeld.metadata.coordinates;
            browser.actions().
                mouseMove(page.dashboard.middleColumn.map.element, {x: 100, y: 100}).
                click().
                perform();
            const coordinatesAfter = page.dashboard.rightColumn.straatbeeld.metadata.coordinates;

            validator('MAP_STRAATBEELD--DETAIL', page);
            expect(coordinatesAfter).not.toBe(coordinatesBefore);

            // Close straatbeeld by clicking the close button
            // We should be redirected to search results now
            page.dashboard.rightColumn.straatbeeld.close.click();
            validator('MAP_SEARCH-RESULTS--LOCATION', page);
        });
    });

    describe('clicking on a hotspot when in straatbeeld', function () {
        it('goes from search results back to different search results', function () {
            // Open search results (search by location)
            page = dp.navigate('MAP_SEARCH-RESULTS--LOCATION');
            const titleBefore = page.title;

            // Open straatbeeld by clicking on the thumbnail
            page.dashboard.rightColumn.searchResults.straatbeeldThumbnail.click();
            validator('STRAATBEELD--SEARCH-RESULTS', page);

            // Drag around to get the hotspots into view
            browser.actions().
                mouseDown(page.dashboard.rightColumn.straatbeeld.element).
                mouseMove({x: 300, y: 0}).
                mouseUp().
                perform();

            // Click on a hotspot
            const coordinatesBefore = page.dashboard.rightColumn.straatbeeld.metadata.coordinates;
            page.dashboard.rightColumn.straatbeeld.hotspots(5).click();
            const coordinatesAfter = page.dashboard.rightColumn.straatbeeld.metadata.coordinates;

            validator('STRAATBEELD--SEARCH-RESULTS', page);
            expect(coordinatesAfter).not.toBe(coordinatesBefore);

            // Close straatbeeld by clicking the close button
            // We should be back at different search results
            page.dashboard.rightColumn.straatbeeld.close.click();
            validator('MAP_SEARCH-RESULTS--LOCATION', page);

            const titleAfter = page.title;
            expect(titleAfter).not.toBe(titleBefore);
        });

        it('goes from a detail page back to the same detail page', function () {
            // Open a detail page
            page = dp.navigate('MAP_DETAIL--NUMMERAANDUIDING');

            // Open straatbeeld by clicking on the thumbnail
            page.dashboard.rightColumn.detail.straatbeeldThumbnail.click();
            validator('STRAATBEELD--DETAIL', page);

            // Drag around to get the hotspots into view
            browser.actions().
                mouseDown(page.dashboard.rightColumn.straatbeeld.element).
                mouseMove({x: -200, y: 0}).
                mouseUp().
                perform();

            // Click on a hotspot
            const coordinatesBefore = page.dashboard.rightColumn.straatbeeld.metadata.coordinates;
            page.dashboard.rightColumn.straatbeeld.hotspots(5).click();
            const coordinatesAfter = page.dashboard.rightColumn.straatbeeld.metadata.coordinates;

            validator('STRAATBEELD--DETAIL', page);
            expect(coordinatesAfter).not.toBe(coordinatesBefore);

            // Close straatbeeld by clicking the close button
            // We should be back at the same detail page
            page.dashboard.rightColumn.straatbeeld.close.click();
            validator('MAP_DETAIL--NUMMERAANDUIDING', page);
        });
    });
});
