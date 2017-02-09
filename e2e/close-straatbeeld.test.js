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
        page = dp.navigate('MAP_SEARCH-RESULTS--LOCATION');
        validator('MAP_SEARCH-RESULTS--LOCATION', page);

        // Open straatbeeld
        page.dashboard.rightColumn.searchResults.straatbeeldThumbnail.click();
        validator('STRAATBEELD--SEARCH-RESULTS', page);

        // Close straatbeeld by clicking the close button
        page.dashboard.rightColumn.straatbeeld.close.click();
        validator('MAP_SEARCH-RESULTS--LOCATION', page);
    });
});
