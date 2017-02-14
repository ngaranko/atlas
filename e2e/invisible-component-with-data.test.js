'use strict';

const validator = require('./validators/validator');

fdescribe('Invisible components should still load relevant data', () => {
    it('the geometry of detail should be visible on a fullscreen map after a page refresh', () => {
        let page = dp.navigate('MAP_DETAIL--NUMMERAANDUIDING');
        expect(page.dashboard.middleColumn.map.hasGeometry).toBe(true);

        // Make the map fullscreen
        page.dashboard.middleColumn.map.toggleFullscreen.click();
        expect(page.dashboard.middleColumn.map.hasGeometry).toBe(true);
        dp.availableStates['MAP'].validator(page);

        // Reload the page
        // .leaflet-pane leaflet-overlay-pane svg
    });

    it('the puntenwolk of data selection should still be visible on the fullscreen map after a page refresh', () => {

    });
});

/*
Actie: open detail met kaart
Actie kaart fullscreen
Controle: staat er geometry op de kaart
Actie reload pagina
Controle: staat er geometry nog steeds op de kaart

===

Actie: open map + data selectie (dus lijstweergave)
Actie kaart fullscreen
Controle: staat er puntenwolk op de kaart
Actie reload pagina
Controle: staat er puntenwolk nog steeds op de kaart

*/
