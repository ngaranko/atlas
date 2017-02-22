fdescribe('Taiga issue #2938', () => {
    it('should show the map and dataSelection after drawing a polygon on the map when navigating from the homepage', () => {
        const page = dp.navigate('PAGE--HOME');

        // Go to the Map
        page.dashboard.rightColumn.page.homepage.map.click();
        dp.validate('LAYER-SELECTION_MAP', page);

        // Close layer selection
        page.dashboard.leftColumn.layerSelection.close();
        dp.validate('MAP', page);
        expect(page.dashboard.middleColumn.map.hasPuntenwolk).toBe(false);

        // Enable the draw tool and draw a polygon on the map
        page.dashboard.middleColumn.map.drawTool.toggleDrawingTool.click();
        page.dashboard.middleColumn.map.click(50, 50);
        page.dashboard.middleColumn.map.click(250, 50);
        page.dashboard.middleColumn.map.click(150, 200);
        page.dashboard.middleColumn.map.drawTool.toggleDrawingTool.click();

        dp.validate('MAP', page);
        expect(page.dashboard.middleColumn.map.hasPuntenwolk).toBe(true);

        // Minimize the map
        page.dashboard.middleColumn.map.toggleFullscreen.click();
        dp.validate('MAP_DATA-SELECTION', page);
    });
});
