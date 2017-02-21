'use strict';

describe('Navigating to and away from straatbeeld', function () {
    let page;

    beforeEach(function () {
        dp.storage.clearAll();
    });

    it('goes from search results back to the same search results', function () {
        // Open search results (search by location)
        page = dp.navigate('MAP_SEARCH-RESULTS--LOCATION');
        const title = page.title;

        // Open straatbeeld by clicking on the thumbnail
        page.dashboard.rightColumn.searchResults.straatbeeldThumbnail.link.click();
        dp.validate('MAP_STRAATBEELD--SEARCH-RESULTS', page);

        // Close straatbeeld by clicking the close button
        // We should be back at the same search results
        page.dashboard.rightColumn.straatbeeld.close.click();
        dp.validate('MAP_SEARCH-RESULTS--LOCATION', page);

        expect(page.title).toBe(title);
    });

    it('goes from a detail page back to the same detail page', function () {
        // Open a detail page
        page = dp.navigate('MAP_DETAIL--NUMMERAANDUIDING');
        const title = page.title;

        // Open straatbeeld by clicking on the thumbnail
        page.dashboard.rightColumn.detail.straatbeeldThumbnail.link.click();
        dp.validate('MAP_STRAATBEELD--DETAIL', page);

        // Close straatbeeld by clicking the close button
        // We should be back at the same detail page
        page.dashboard.rightColumn.straatbeeld.close.click();
        dp.validate('MAP_DETAIL--NUMMERAANDUIDING', page);

        expect(page.title).toBe(title);
    });

    describe('clicking on the map when in straatbeeld', function () {
        it('goes from search results back to different search results', function () {
            // Open search results (search by location)
            page = dp.navigate('MAP_SEARCH-RESULTS--LOCATION');
            const searchTitle = page.title;

            // Open straatbeeld by clicking on the thumbnail
            page.dashboard.rightColumn.searchResults.straatbeeldThumbnail.link.click();
            const straatbeeldTitle = page.title;
            dp.validate('MAP_STRAATBEELD--SEARCH-RESULTS', page);

            // Click on the map (the straatbeeld coordinates should change)
            page.dashboard.middleColumn.map.click(100, 100);
            dp.validate('MAP_STRAATBEELD--SEARCH-RESULTS', page);
            expect(page.title).not.toBe(straatbeeldTitle);

            // Close straatbeeld by clicking the close button
            // We should be back at different search results
            page.dashboard.rightColumn.straatbeeld.close.click();
            dp.validate('MAP_SEARCH-RESULTS--LOCATION', page);

            expect(page.title).not.toBe(searchTitle);
        });

        it('goes from a detail page back to search results', function () {
            // Open a detail page
            page = dp.navigate('MAP_DETAIL--NUMMERAANDUIDING');

            // Open straatbeeld by clicking on the thumbnail
            page.dashboard.rightColumn.detail.straatbeeldThumbnail.link.click();
            const straatbeeldTitle = page.title;
            dp.validate('MAP_STRAATBEELD--DETAIL', page);

            // Click on the map (the straatbeeld coordinates should change)
            page.dashboard.middleColumn.map.click(100, 100);
            dp.validate('MAP_STRAATBEELD--SEARCH-RESULTS', page);
            expect(page.title).not.toBe(straatbeeldTitle);

            // Close straatbeeld by clicking the close button
            // We should be redirected to search results now
            page.dashboard.rightColumn.straatbeeld.close.click();
            dp.validate('MAP_SEARCH-RESULTS--LOCATION', page);
        });
    });
});
