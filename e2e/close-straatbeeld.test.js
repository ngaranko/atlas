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
});
