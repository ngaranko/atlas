module.exports = {
    'DATA-SELECTION--CARDS': {
        url: '#?lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9&view=CARDS&dataset=catalogus&dataset-pagina=1',
        validator: require('./validators/data-selection--cards')
    },
    'DATA-SELECTION--TABLE': {
        url: '#?lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9&view=TABLE&dataset=bag&dataset-pagina=1',
        validator: require('./validators/data-selection--table')
    },
    'DETAIL': {
        url: '#?lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9&detail=https:%2F%2Fapi.datapunt.amsterdam.nl%2Fca' +
            'talogus%2Fapi%2F3%2Faction%2Fpackage_show%3Fid%3D642f15c7-8368-4795-9e3d-1a87fa7e562a&volledig-detail=aan',
        validator: require('./validators/detail')
    },
    'LAYER-SELECTION_MAP': {
        url: '#?lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9&kaartlagen-selectie=aan&pagina=home',
        validator: require('./validators/layer-selection_map')
    },
    'MAP': {
        url: '#?lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9&volledig-scherm=aan&pagina=home',
        validator: require('./validators/map')
    },
    'MAP_DATA-SELECTION': {
        url: '#?lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9&view=LIST&dataset=bag&dataset-pagina=1',
        validator: require('./validators/map_data-selection')
    },
    'MAP_DETAIL--NUMMERAANDUIDING': {
        url: '#?lat=52.353263440372224&lon=5.001382398402873&basiskaart=topografie&zoom=16&detail=https:%2F%2Fapi.dat' +
            'apunt.amsterdam.nl%2Fbag%2Fnummeraanduiding%2F03630000500149%2F',
        validator: require('./validators/map_detail--nummeraanduiding')
    },
    'MAP_PAGE--HOME': {
        url: '',
        validator: require('./validators/map_page--home')
    },
    'MAP_PAGE--LOGIN': {
        url: '#?lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9&pagina=login',
        validator: require('./validators/map_page--login')
    },
    'MAP_SEARCH-RESULTS--LOCATION': {
        url: '#?zoek=52.36278290469469,4.922634147785671&lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9',
        validator: require('./validators/map_search-results--location')
    },
    'MAP_SEARCH-RESULTS--QUERY': {
        url: '#?zoek=Linnaeusstraat%202&lat=52.3719&lon=4.9012&basiskaart=topografie&zoom=9',
        validator: require('./validators/map_search-results--query')
    },
    'MAP_STRAATBEELD--DETAIL': {
        url: '#?lat=52.3630723571084&lon=4.92265756777558&basiskaart=topografie&zoom=16&detail=https:%2F%2Fapi.datapu' +
            'nt.amsterdam.nl%2Fbag%2Fverblijfsobject%2F03630024092601%2F&id=TMX7315120208-000048_pano_0000_002519&str' +
            'aatbeeld=52.3630723571084,4.92265756777558&heading=176.99999999999997&pitch=0&fov=71.47434965060135',
        validator: require('./validators/map_straatbeeld--detail')
    },
    'MAP_STRAATBEELD--SEARCH-RESULTS': {
        url: '#?lat=52.3630723571084&lon=4.92265756777558&basiskaart=topografie&zoom=9&id=TMX7315120208-000048_pano_0' +
            '000_002519&straatbeeld=52.3630723571084,4.92265756777558&heading=-176.99999999999997&pitch=0&fov=80',
        validator: require('./validators/map_straatbeeld--search-results')
    },
    'STRAATBEELD--DETAIL': {
        url: '#?lat=52.3630723571084&lon=4.92265756777558&basiskaart=topografie&zoom=16&detail=https:%2F%2Fapi.datapu' +
            'nt.amsterdam.nl%2Fbag%2Fverblijfsobject%2F03630024092601%2F&id=TMX7315120208-000048_pano_0000_002519&str' +
            'aatbeeld=52.3630723571084,4.92265756777558&heading=176.99999999999997&pitch=0&fov=71.47434965060135&voll' +
            'edig-straatbeeld=aan',
        validator: require('./validators/straatbeeld--detail')
    },
    'STRAATBEELD--SEARCH-RESULTS': {
        url: '#?lat=52.3630723571084&lon=4.92265756777558&basiskaart=topografie&zoom=9&id=TMX7315120208-000048_pano_0' +
            '000_002519&straatbeeld=52.3630723571084,4.92265756777558&heading=-176.99999999999997&pitch=0&fov=71.4743' +
            '4965060135&volledig-straatbeeld=aan',
        validator: require('./validators/straatbeeld--search-results')
    }
};
