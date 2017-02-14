let page;

fdescribe('The fullscreen map (or map w/ layerSelection) remembers how you got there', () => {
    it('navigates to a new straatbeeld if straatbeeld is active but invisible', () => {
        page = dp.navigate('MAP_STRAATBEELD--DETAIL');

        // Open layerSelection
        page.dashboard.middleColumn.map.toggleLayerSelection.click();
        dp.availableStates['LAYER-SELECTION_MAP'].validator(page);

        // Click on the map, return to (a different) straatbeeld
        page.dashboard.middleColumn.map.click(100, 100);
        dp.availableStates['MAP_STRAATBEELD--SEARCH-RESULTS'].validator(page);
    });


    it('remembers the active page', () => {
        page = dp.navigate('MAP_PAGE--HOME');

        // Make the map fullscreen
        page.dashboard.middleColumn.map.toggleFullscreen.click();
        dp.availableStates['MAP'].validator(page);

        // Open layer selection
        page.dashboard.middleColumn.map.toggleLayerSelection.click();
        dp.availableStates['LAYER-SELECTION_MAP'].validator(page);

        // Close layer selection, return to the fullscreen map
        page.dashboard.middleColumn.map.toggleLayerSelection.click();
        dp.availableStates['MAP'].validator(page);

        // Close the fullscreen map, return to the homepage
        page.dashboard.middleColumn.map.toggleFullscreen.click();
        dp.availableStates['MAP_PAGE--HOME'].validator(page);
    });

    it('remembers the active detail page when opening and closing layer selection', () => {
        page = dp.navigate('MAP_DETAIL--NUMMERAANDUIDING');

        // Open layer selection
        page.dashboard.middleColumn.map.toggleLayerSelection.click();
        dp.availableStates['MAP'].validator(page);

        // Close layer selection and return to the detail page
        page.dashboard.leftColumn.layerSelection.close();
        dp.availableStates['MAP_DETAIL--NUMMERAANDUIDING'].validator(page);


        /*
        Actie: ga naar kaart+detail
        Actie: open kaartlaag selectie
        Actie: sluit kaartlaag selectie
        */
    });

    it('remembers the active detail page when playing with layer selection followed by a fullscreen map', () => {
        /*
         Actie: ga naar kaart+detail
         Actie: open kaartlaag selectie
         Controle: layer selection + map
         Actie: kaart fullscreen
         Controle: MAP fullscreen
         Actie: kaart klein maken (toggle fullscreen)
         Controle: ben ik bij map+detail en dus niet bij layer-selection
         */
    });

    it('remembers the active detail page when playing with a fullscreen map followed by layer selection', () => {
        /*
         Actie: ga naar kaart+detail
         Actie: maak kaart fullscreen
         Actie: open layer selection
         Actie: maak kaart fullscreen
         Actie: kaart klein maken (toggle fullscreen)
         Controle: ben ik bij map+detail en dus niet bij layer-selection
         */
    });

    it('remebers the active detail page when playing w/ the layerSelection panel', () => {
        /*
         Actie: ga naar kaart+detail
         Actie: maak kaart fullscreen
         Actie: open kaartlaag selectie
         Actie: sluit kaartlaag selectie (via close icon linker kolom)
         Controle: ben ik bij fullscreen map
         Actie: minimaliseer kaart
         COntrole: ben ik weer bij detail+map
         */
    });
});
