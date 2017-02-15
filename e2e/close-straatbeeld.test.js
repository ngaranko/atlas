'use strict';

describe('Navigating to and away from straatbeeld', function () {
    let page;

    beforeEach(function () {
        dp.storage.clearAll();
    });

    it('goes from search results back to the same search results', function () {
        // Open search results (search by location)
        page = dp.navigate('MAP_SEARCH-RESULTS--LOCATION');
        const titleBefore = page.title;

        // Open straatbeeld by clicking on the thumbnail
        page.dashboard.rightColumn.searchResults.straatbeeldThumbnail.link.click();
        dp.validate('STRAATBEELD--SEARCH-RESULTS', page);

        // Close straatbeeld by clicking the close button
        // We should be back at the same search results
        page.dashboard.rightColumn.straatbeeld.close.click();
        dp.validate('MAP_SEARCH-RESULTS--LOCATION', page);

        const titleAfter = page.title;
        expect(titleAfter).toBe(titleBefore);
    });

    it('goes from a detail page back to the same detail page', function () {
        // Open a detail page
        page = dp.navigate('MAP_DETAIL--NUMMERAANDUIDING');
        const titleBefore = page.title;

        // Open straatbeeld by clicking on the thumbnail
        page.dashboard.rightColumn.detail.straatbeeldThumbnail.link.click();
        dp.validate('STRAATBEELD--DETAIL', page);

        // Close straatbeeld by clicking the close button
        // We should be back at the same detail page
        page.dashboard.rightColumn.straatbeeld.close.click();
        dp.validate('MAP_DETAIL--NUMMERAANDUIDING', page);

        const titleAfter = page.title;
        expect(titleAfter).toBe(titleBefore);
    });

    describe('clicking on the map when in straatbeeld', function () {
        it('goes from search results back to different search results', function () {
            // Open search results (search by location)
            page = dp.navigate('MAP_SEARCH-RESULTS--LOCATION');
            const titleBefore = page.title;

            // Open straatbeeld by clicking on the thumbnail
            page.dashboard.rightColumn.searchResults.straatbeeldThumbnail.link.click();
            dp.validate('STRAATBEELD--SEARCH-RESULTS', page);

            // Open the map
            page.dashboard.rightColumn.straatbeeld.toggleStraatbeeldFullscreen.click();
            dp.validate('MAP_STRAATBEELD--SEARCH-RESULTS', page);

            // Click on the map (the straatbeeld coordinates should change)
            const coordinatesBefore = page.dashboard.rightColumn.straatbeeld.metadata.coordinates;
            page.dashboard.middleColumn.map.click(100, 100);
            const coordinatesAfter = page.dashboard.rightColumn.straatbeeld.metadata.coordinates;

            dp.validate('MAP_STRAATBEELD--SEARCH-RESULTS', page);
            expect(coordinatesAfter).not.toBe(coordinatesBefore);

            // Close straatbeeld by clicking the close button
            // We should be back at different search results
            page.dashboard.rightColumn.straatbeeld.close.click();
            dp.validate('MAP_SEARCH-RESULTS--LOCATION', page);

            const titleAfter = page.title;
            expect(titleAfter).not.toBe(titleBefore);
        });

        it('goes from a detail page back to search results', function () {
            // Open a detail page
            page = dp.navigate('MAP_DETAIL--NUMMERAANDUIDING');

            // Open straatbeeld by clicking on the thumbnail
            page.dashboard.rightColumn.detail.straatbeeldThumbnail.link.click();
            dp.validate('STRAATBEELD--DETAIL', page);

            // Open the map
            page.dashboard.rightColumn.straatbeeld.toggleStraatbeeldFullscreen.click();
            dp.validate('MAP_STRAATBEELD--DETAIL', page);

            // Click on the map (the straatbeeld coordinates should change)
            const coordinatesBefore = page.dashboard.rightColumn.straatbeeld.metadata.coordinates;
            page.dashboard.middleColumn.map.click(100, 100);
            const coordinatesAfter = page.dashboard.rightColumn.straatbeeld.metadata.coordinates;

            dp.validate('MAP_STRAATBEELD--SEARCH-RESULTS', page);
            expect(coordinatesAfter).not.toBe(coordinatesBefore);

            // Close straatbeeld by clicking the close button
            // We should be redirected to search results now
            page.dashboard.rightColumn.straatbeeld.close.click();
            dp.validate('MAP_SEARCH-RESULTS--LOCATION', page);
        });
    });
});
