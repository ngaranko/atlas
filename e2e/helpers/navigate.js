const dashboardPageObjects = require('../page-objects/dashboard.js');

const URLS = {
    'DATA-SELECTION--CARDS':            'http://localhost:8000/#?lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9&view=CARDS&dataset=catalogus&dataset-pagina=1',
    'DATA-SELECTION--TABLE':            'http://localhost:8000/#?lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9&view=TABLE&dataset=bag&dataset-pagina=1',
    'DETAIL':                           'http://localhost:8000/#?lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9&view=CARDS&dataset=catalogus&dataset-pagina=1',
    'LAYER-SELECTION_MAP':              'http://localhost:8000/#?lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9&kaartlagen-selectie=aan&pagina=home',
    'MAP':                              'http://localhost:8000/#?lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9&volledig-scherm=aan&pagina=home',
    'MAP_DATA-SELECTION':               'http://localhost:8000/#?lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9&view=LIST&dataset=bag&dataset-pagina=1',
    'MAP_DETAIL--NUMMERAANDUIDING':     'http://localhost:8000/#?lat=52.353263440372224&lon=5.001382398402873&basiskaart=topografie&zoom=16&detail=https:%2F%2Fapi.datapunt.amsterdam.nl%2Fbag%2Fnummeraanduiding%2F03630000500149%2F',
    'MAP_PAGE--HOME':                   'http://localhost:8000/',
    'MAP_PAGE--LOGIN':                  'http://localhost:8000/#?lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9&pagina=login',
    'MAP_SEARCH-RESULTS--LOCATION':     'http://localhost:8000/#?zoek=52.36278290469469,4.922634147785671&lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9',
    'MAP_SEARCH-RESULTS--QUERY':        'http://localhost:8000/#?zoek=Linnaeusstraat%202&lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9',
    'MAP_STRAATBEELD--DETAIL':          'http://localhost:8000/#?lat=52.3630723571084&lon=4.92265756777558&basiskaart=topografie&zoom=16&detail=https:%2F%2Fapi.datapunt.amsterdam.nl%2Fbag%2Fverblijfsobject%2F03630024092601%2F&id=TMX7315120208-000048_pano_0000_002519&straatbeeld=52.3630723571084,4.92265756777558&heading=176.99999999999997&pitch=0&fov=71.47434965060135',
    'MAP_STRAATBEELD--SEARCH-RESULTS':  'http://localhost:8000/#?lat=52.3630723571084&lon=4.92265756777558&basiskaart=topografie&zoom=9&id=TMX7315120208-000048_pano_0000_002519&straatbeeld=52.3630723571084,4.92265756777558&heading=-176.99999999999997&pitch=0&fov=80',
    'STRAATBEELD--DETAIL':              'http://localhost:8000/#?lat=52.3630723571084&lon=4.92265756777558&basiskaart=topografie&zoom=16&detail=https:%2F%2Fapi.datapunt.amsterdam.nl%2Fbag%2Fverblijfsobject%2F03630024092601%2F&id=TMX7315120208-000048_pano_0000_002519&straatbeeld=52.3630723571084,4.92265756777558&heading=176.99999999999997&pitch=0&fov=71.47434965060135&volledig-straatbeeld=aan',
    'STRAATBEELD--SEARCH-RESULTS':      'http://localhost:8000/#?lat=52.3630723571084&lon=4.92265756777558&basiskaart=topografie&zoom=9&id=TMX7315120208-000048_pano_0000_002519&straatbeeld=52.3630723571084,4.92265756777558&heading=-176.99999999999997&pitch=0&fov=71.47434965060135&volledig-straatbeeld=aan'
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
