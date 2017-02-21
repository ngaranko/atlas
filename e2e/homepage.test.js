describe('The homepage', () => {
    describe('navigate to the map w/ layer selection opened', () => {
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

        it('minimize the map, return to the homepage', () => {
            const page = dp.navigate('PAGE--HOME');

            // Go to the map
            page.dashboard.rightColumn.page.homepage.map.click();
            dp.validate('LAYER-SELECTION_MAP', page);

            // Close the fullscreen map and return to the homepage
            page.dashboard.middleColumn.map.toggleFullscreen.click();
            dp.validate('PAGE--HOME', page);
        });
    });

    describe('navigate to straatbeeld w/ a map', () => {
        it('and back to the homepage by closing it', () => {
            const page = dp.navigate('PAGE--HOME');

            // Go to straatbeeld
            page.dashboard.rightColumn.page.homepage.straatbeeld.click();
            dp.validate('MAP_STRAATBEELD--PAGE', page);

            // Close straatbeeld and return to the homepage
            page.dashboard.rightColumn.straatbeeld.close.click();
            dp.validate('PAGE--HOME', page);
        });

        it('make the map fullscreen, small again, and close straatbeeld then return to the homepage', () => {
            const page = dp.navigate('PAGE--HOME');

            // Go to straatbeeld
            page.dashboard.rightColumn.page.homepage.straatbeeld.click();
            dp.validate('MAP_STRAATBEELD--PAGE', page);

            // Make the map fullscreen
            page.dashboard.middleColumn.map.toggleFullscreen.click();
            dp.validate('MAP', page);

            // Make the map small again
            page.dashboard.middleColumn.map.toggleFullscreen.click();
            dp.validate('MAP_STRAATBEELD--PAGE', page);

            // Make straatbeeld fullscreen
            page.dashboard.rightColumn.straatbeeld.toggleStraatbeeldFullscreen.click();
            dp.validate('STRAATBEELD--PAGE', page);

            // Close straatbeeld and return to the homepage
            page.dashboard.rightColumn.straatbeeld.close.click();
            dp.validate('PAGE--HOME', page);
        });

        it('clicking on hotspots and then back to the homepage', () => {
            const page = dp.navigate('PAGE--HOME');

            // Go to straatbeeld
            page.dashboard.rightColumn.page.homepage.straatbeeld.click();
            dp.validate('MAP_STRAATBEELD--PAGE', page);

            const oldPageTitle = page.title;

            // Click a hotspot, load a different straatbeeld
            page.dashboard.rightColumn.straatbeeld.hotspots(4).click();
            expect(oldPageTitle).not.toBe(page.title);

            // use the back button, return to the homepage
            browser.navigate().back();
            dp.validate('PAGE--HOME', page);
        });
    });
});
