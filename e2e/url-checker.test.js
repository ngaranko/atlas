'use strict';

const availableStates = require('./helpers/available-states');
const navigate = require('./helpers/navigate');

describe('each URL should load the corresponding view', function () {
    const AVAILABLE_STATE_KEYS = Object.keys(availableStates);
    let page;

    /*
    AVAILABLE_STATE_KEYS.forEach(key => {
        it(key, () => {
            navigate(key);
            availableStates[key].validator();
        })
    });
    */

    it('DATA-SELECTION--CARDS', () => {
        page = navigate('DATA-SELECTION--CARDS');
        availableStates['DATA-SELECTION--CARDS'].validator(page);
    });

    it('DATA-SELECTION--TABLE', () => {
        page = navigate('DATA-SELECTION--TABLE');
        availableStates['DATA-SELECTION--TABLE'].validator(page);
    });

    it('DETAIL', () => {
        page = navigate('DETAIL');
        availableStates['DETAIL'].validator(page);
    });

    it('LAYER-SELECTION_MAP', () => {
        page = navigate('LAYER-SELECTION_MAP');
        availableStates['LAYER-SELECTION_MAP'].validator(page);
    });

    it('MAP', () => {
        page = navigate('MAP');
        availableStates['MAP'].validator(page);
    });

    it('MAP_DATA-SELECTION', () => {
        page = navigate('MAP_DATA-SELECTION');
        availableStates['MAP_DATA-SELECTION'].validator(page);
    });

    it('MAP_DETAIL--NUMMERAANDUIDING', () => {
        page = navigate('MAP_DETAIL--NUMMERAANDUIDING');
        availableStates['MAP_DETAIL--NUMMERAANDUIDING'].validator(page);
    });

    it('MAP_PAGE--HOME', () => {
        page = navigate('MAP_PAGE--HOME');
        availableStates['MAP_PAGE--HOME'].validator(page);
    });

    it('MAP_PAGE--LOGIN', () => {
        page = navigate('MAP_PAGE--LOGIN');
        availableStates['MAP_PAGE--LOGIN'].validator(page);
    });

    it('MAP_SEARCH-RESULTS--LOCATION', () => {
        page = navigate('MAP_SEARCH-RESULTS--LOCATION');
        availableStates['MAP_SEARCH-RESULTS--LOCATION'].validator(page);
    });
});

/*
 MAP_SEARCH-RESULTS--LOCATION
 MAP_SEARCH-RESULTS--QUERY
 MAP_STRAATBEELD--DETAIL
 MAP_STRAATBEELD--SEARCH-RESULTS
 STRAATBEELD--DETAIL
 STRAATBEELD--SEARCH-RESULTS
 */
