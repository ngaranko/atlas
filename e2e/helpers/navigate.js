'use strict';

const dashboardPageObjects = require('../../modules/atlas/components/dashboard/dashboard.page-objects');

const URLS = {
    'DATA-SELECTION--CARDS': '#?lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9&view=CARDS&dataset=catalogus&data' +
        'set-pagina=1',
    'DATA-SELECTION--TABLE': '#?lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9&view=TABLE&dataset=bag&dataset-pa' +
        'gina=1',
    'DETAIL': '#?lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9&view=CARDS&dataset=catalogus&dataset-pagina=1',
    'LAYER-SELECTION_MAP': '#?lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9&kaartlagen-selectie=aan&pagina=home',
    'MAP': '#?lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9&volledig-scherm=aan&pagina=home',
    'MAP_DATA-SELECTION': '#?lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9&view=LIST&dataset=bag&dataset-pagina' +
        '=1',
    'MAP_DETAIL--NUMMERAANDUIDING': '#?lat=52.353263440372224&lon=5.001382398402873&basiskaart=topografie&zoom=16&det' +
        'ail=https:%2F%2Fapi.datapunt.amsterdam.nl%2Fbag%2Fnummeraanduiding%2F03630000500149%2F',
    'MAP_PAGE--HOME': '',
    'MAP_PAGE--LOGIN': '#?lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9&pagina=login',
    'MAP_SEARCH-RESULTS--LOCATION': '#?zoek=52.36278290469469,4.922634147785671&lat=52.3719&lon=4.9012&basiskaart=top' +
        'ografie&zoom=9',
    'MAP_SEARCH-RESULTS--QUERY': '#?zoek=Linnaeusstraat%202&lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9',
    'MAP_STRAATBEELD--DETAIL': '#?lat=52.3630723571084&lon=4.92265756777558&basiskaart=topografie&zoom=16&detail=http' +
        's:%2F%2Fapi.datapunt.amsterdam.nl%2Fbag%2Fverblijfsobject%2F03630024092601%2F&id=TMX7315120208-000048_pano_0' +
        '000_002519&straatbeeld=52.3630723571084,4.92265756777558&heading=176.99999999999997&pitch=0&fov=71.474349650' +
        '60135',
    'MAP_STRAATBEELD--SEARCH-RESULTS': '#?lat=52.3630723571084&lon=4.92265756777558&basiskaart=topografie&zoom=9&id=T' +
        'MX7315120208-000048_pano_0000_002519&straatbeeld=52.3630723571084,4.92265756777558&heading=-176.999999999999' +
        '97&pitch=0&fov=80',
    'STRAATBEELD--DETAIL': '#?lat=52.3630723571084&lon=4.92265756777558&basiskaart=topografie&zoom=16&detail=https:%2' +
        'F%2Fapi.datapunt.amsterdam.nl%2Fbag%2Fverblijfsobject%2F03630024092601%2F&id=TMX7315120208-000048_pano_0000_' +
        '002519&straatbeeld=52.3630723571084,4.92265756777558&heading=176.99999999999997&pitch=0&fov=71.4743496506013' +
        '5&volledig-straatbeeld=aan',
    'STRAATBEELD--SEARCH-RESULTS': '#?lat=52.3630723571084&lon=4.92265756777558&basiskaart=topografie&zoom=9&id=TMX73' +
        '15120208-000048_pano_0000_002519&straatbeeld=52.3630723571084,4.92265756777558&heading=-176.99999999999997&p' +
        'itch=0&fov=71.47434965060135&volledig-straatbeeld=aan'
};

module.exports = function (pageName) {
    browser.get(URLS[pageName]);

    return {
        title,
        dashboard
    };

    function title () {
        return browser.getTitle();
    }

    function dashboard () {
        return dashboardPageObjects(element(by.css('dp-dashboard')));
    }
};
