/*
Actie: Ga naar straatbeeld via search results
Controle: Ben ik bij straatbeeld (fullscreen)

Actie: Sluit straatbeeld
Controle: Ben ik weer bij search results

===

Actie: Ga naar straatbeeld via detail
Controle: Ben ik bij straatbeeld (fullscreen)

Actie: Sluit straatbeeld
Controle: Ben ik weer bij dezelfde detailpagina

===

Actie: Ga naar straatbeeld via detail
Controle: Ben ik bij straatbeeld (fullscreen)

Actie: Open de kaart
Controle: Ben ik bij straatbeeld met de kaart open

Actie: Klik op de kaart
Controle: Ben ik nog steeds bij straatbeeld (fullscreen)
Controle: Is er een nieuwe panorama ingeladen

Actie: Sluit straatbeeld
Controle: Ben ik nu bij zoekresultaten (i.p.v. detail)

===

Actie: Ga naar straatbeeld via detail
Controle: Ben ik bij straatbeeld (fullscreen)

Actie: navigeer via hotspot
Controle: Ben ik nog steeds bij straatbeeld (fullscreen)
Controle: Is er een nieuwe panorama ingeladen

Actie: Sluit straatbeeld
Controle: Ben ik weer bij dezelfde detailpagina (en dus niet bij zoekresultaten)
*/

'use strict';

const validator = require('./validators/validator');

describe('Navigating to and away from straatbeeld', function () {
    let page;

    it('allows to navigate from search results to straatbeeld and back', function () {
        // Open search results (search by location)
        page = dp.navigate('MAP_SEARCH-RESULTS--LOCATION');

        // Open straatbeeld by clicking on the thumbnail
        page.dashboard.rightColumn.searchResults.straatbeeldThumbnail.click();
        validator('STRAATBEELD--SEARCH-RESULTS', page);

        // Close straatbeeld by clicking the close button
        // We should be back at the same search results
        page.dashboard.rightColumn.straatbeeld.close.click();
        validator('MAP_SEARCH-RESULTS--LOCATION', page);
    });

    it('allows to navigate from a detail page to straatbeeld and back', function () {
        // Open a detail page
        page = dp.navigate('MAP_DETAIL--NUMMERAANDUIDING');

        // Open straatbeeld by clicking on the thumbnail
        page.dashboard.rightColumn.detail.straatbeeldThumbnail.click();
        validator('STRAATBEELD--DETAIL', page);

        // Close straatbeeld by clicking the close button
        // We should be back at the same detail page
        page.dashboard.rightColumn.straatbeeld.close.click();
        validator('MAP_DETAIL--NUMMERAANDUIDING', page);
    });

    it('allows to navigate from detail to straatbeeld and back to search results when clicked on the map', function () {
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

    fit('allows to navigate from detail to straatbeeld and back, while clicking on hotspots', function () {
        // Open a detail page
        page = dp.navigate('MAP_DETAIL--NUMMERAANDUIDING');

        // Open straatbeeld by clicking on the thumbnail
        page.dashboard.rightColumn.detail.straatbeeldThumbnail.click();
        validator('STRAATBEELD--DETAIL', page);

        // Click on a hotspot
        //let hotspots = page.dashboard.rightColumn.straatbeeld.getVisibleHotspots();
        page.dashboard.rightColumn.straatbeeld.hotspots(5).click();
        expect(page.dashboard.rightColumn.straatbeeld.hotspots(5)).toBe(true);

        /*
        page.dashboard.rightColumn.straatbeeld.getVisibleHotspots().then(function (hotspots) {
            expect(hotspots).toBe(true);
            return;

            const coordinatesBefore = page.dashboard.rightColumn.straatbeeld.metadata.coordinates;
            hotspots[0].click();
            const coordinatesAfter = page.dashboard.rightColumn.straatbeeld.metadata.coordinates;

            validator('MAP_STRAATBEELD--DETAIL', page);
            expect(coordinatesAfter).not.toBe(coordinatesBefore);
        });
        */
    });
});
