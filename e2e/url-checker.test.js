'use strict';

const availableStates = require('./helpers/available-states');
const navigate = require('./helpers/navigate');
const validateMapPageHome = require('./helpers/validators/map_page--home');

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
});

/*
 DATA-SELECTION--CARDS
 DATA-SELECTION--TABLE
 DETAIL
 LAYER-SELECTION_MAP
 MAP
 MAP_DATA-SELECTION
 MAP_DETAIL--NUMMERAANDUIDING
 MAP_PAGE--HOME
 MAP_PAGE--LOGIN
 MAP_SEARCH-RESULTS--LOCATION
 MAP_SEARCH-RESULTS--QUERY
 MAP_STRAATBEELD--DETAIL
 MAP_STRAATBEELD--SEARCH-RESULTS
 STRAATBEELD--DETAIL
 STRAATBEELD--SEARCH-RESULTS
 */
