describe('The homepage', () => {
    describe('navigate to the map w/ layer selection openend', () => {
        it('close layer selection, then the map, return to the homepage', () => {
            const page = dp.navigate('PAGE--HOME');

            // Go to the map
            page.dashboard.rightColumn.page.homepage.map.click();
            dp.validate('LAYER-SELECTION_MAP', page);

            // Close layer selection
            page.dashboard.leftColumn.layerSelection.close();
            dp.validate('MAP', page);

            // Close the fullscreen map and return to the homepage
            page.dashboard.middleColumn.map.toggleFullscreen.click();
            dp.validate('PAGE--HOME', page);
        });

        it('make the map fullscreen, close it, return to the homepage', () => {
            const page = dp.navigate('PAGE--HOME');

            // Go to the map
            page.dashboard.rightColumn.page.homepage.map.click();
            dp.validate('LAYER-SELECTION_MAP', page);

            // Make the map fullscreen
            page.dashboard.middleColumn.map.toggleFullscreen.click();
            dp.validate('MAP', page);

            // Close the fullscreen map and return to the homepage
            page.dashboard.middleColumn.map.toggleFullscreen.click();
            dp.validate('PAGE--HOME', page);
        });
    });

    describe('navigate to straatbeeld', () => {
        beforeEach(function () {
            dp.storage.clearAll();
        });

        it('and back to the homepage by closing it', () => {
            const page = dp.navigate('PAGE--HOME');

            // Go to straatbeeld
            page.dashboard.rightColumn.page.homepage.straatbeeld.click();
            dp.validate('STRAATBEELD--PAGE', page);

            // Close straatbeeld and return to the homepage
            page.dashboard.rightColumn.straatbeeld.close.click();
            dp.validate('PAGE--HOME', page);
        });

        it('make the map fullscreen, small again, and close straatbeeld then return to the homepage', () => {
            const page = dp.navigate('PAGE--HOME');

            // Go to straatbeeld
            page.dashboard.rightColumn.page.homepage.straatbeeld.click();
            dp.validate('STRAATBEELD--PAGE', page);

            // Show the map
            page.dashboard.rightColumn.straatbeeld.toggleStraatbeeldFullscreen.click();
            dp.validate('MAP_STRAATBEELD--PAGE', page);

            // Make the map fullscreen
            page.dashboard.middleColumn.map.toggleFullscreen.click();
            dp.validate('MAP', page);

            // Make the map small again
            page.dashboard.middleColumn.map.toggleFullscreen.click();
            dp.validate('MAP_STRAATBEELD--PAGE', page);

            // Make straatbeeld fullscreen again (hide the map)
            page.dashboard.rightColumn.straatbeeld.toggleStraatbeeldFullscreen.click();
            dp.validate('STRAATBEELD--PAGE', page);

            // Close straatbeeld and return to the homepage
            page.dashboard.rightColumn.straatbeeld.close.click();
            dp.validate('PAGE--HOME', page);
        });

        it('clicking on hotspots and then back to the homepage', () => {

        });
    });
});
